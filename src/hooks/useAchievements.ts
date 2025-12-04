import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import type { WorryDetailTypeKeys } from '@/lib/constants'

const ACHIEVEMENTS_KEY = ['achievements']

export const useAchievements = () => {
  const queryClient = useQueryClient()

  const { data: unlockedIds = [] } = useQuery<string[]>({
    queryKey: ACHIEVEMENTS_KEY,
    queryFn: () => Promise.resolve([]),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const unlockAchievement = useMutation({
    mutationFn: async (id: string) => id,
    onSuccess: (id) => {
      queryClient.setQueryData(ACHIEVEMENTS_KEY, (old: string[] = []) => {
        if (old.includes(id)) return old
        return [...old, id]
      })
    }
  })

  const isUnlocked = (key: WorryDetailTypeKeys) => unlockedIds.includes(key.toString())

  return {
    unlockedIds,
    unlock: unlockAchievement.mutate,
    isUnlocked
  }
}
