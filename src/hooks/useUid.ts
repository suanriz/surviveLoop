import { useEffect, useState } from 'react'

import { login } from '@/lib/firebase'

export const useUid = () => {
  const [uid, setUid] = useState<string | null>(() => localStorage.getItem('uid'))

  useEffect(() => {
    if (!uid) {
      login().then(resp => {
        const newUid = resp.user.uid
        localStorage.setItem('uid', newUid)
        setUid(newUid)
      })
    }
  }, [uid])

  return uid
}
