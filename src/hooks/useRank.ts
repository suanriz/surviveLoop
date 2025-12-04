import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ref, get, runTransaction } from 'firebase/database'

import { useUid } from '@/hooks/useUid'
import { db } from '@/lib/firebase'
import type { RankDataType } from '@/lib/type'

export const useRank = (enabled: boolean = true) => {
  return useQuery<RankDataType[]>({
    queryKey: ['rank'],
    queryFn: async () => {
      const rankRef = ref(db, 'rank')
      const snapshot = await get(rankRef)
      const data = snapshot.val()

      if (data) {
        return Object.keys(data)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(key => data[key])
      }
      return []
    },
    enabled,
    staleTime: 0,
  })
}

export const useUpdateRank = () => {
  const uid = useUid()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (player: { name: string; count: number; wisdom: number }) => {
      const rankRef = ref(db, 'rank')

      await runTransaction(rankRef, (current: Record<string, any> | null) => {
        const entries = current ? Object.values(current) : []
        const filtered = entries.filter(p => p.uid !== uid)
        filtered.push({
          ...player,
          uid,
          timestamp: Date.now(),
        })

        const top5 = filtered
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        const result: Record<string, any> = {}
        top5.forEach((p, i) => {
          result[(i + 1).toString()] = p
        })

        return result
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rank'] })
    },
  })
}
