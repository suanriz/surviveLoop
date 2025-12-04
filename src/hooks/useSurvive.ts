import { useReducer, useCallback } from 'react'

import type { SurviveStateType, SurviveAction } from '@/lib/type'
import { surviveReducer, initState } from '@/reducers/surviveReducer'

export const useSurvive = () => {
  const [state, dispatch] = useReducer(
    (state: SurviveStateType, action: SurviveAction) =>
      surviveReducer(state, action),
    initState
  )

  const worry = useCallback(() => {
    dispatch({ type: 'WORRY', hasThing: Math.random() < 0.5 })
  }, [])

  const newWorry = useCallback(() => {
    dispatch({ type: 'NEW_WORRY', hasThing: Math.random() < 0.5 })
  }, [])

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' })
  }, [])

  return { state, worry, newWorry, close, dispatch }
}