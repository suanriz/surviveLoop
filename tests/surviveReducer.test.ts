import { describe, it, expect } from 'vitest'

import { MAX_LV } from '@/lib/constants'
import { surviveReducer, initState } from '@/reducers/surviveReducer'

describe('surviveReducer', () => {
  it('should handle WORRY action correctly', () => {
    const state = surviveReducer(initState, { type: 'WORRY', hasThing: true })
    expect(state.count).toBe(1)
    expect(state.notThing).toBe(0)
    expect(state.lv).toBe(1)

    const state2 = surviveReducer(initState, { type: 'WORRY', hasThing: false })
    expect(state2.count).toBe(1)
    expect(state2.notThing).toBe(1)
    expect(state2.lv).toBe(0)
  })

  it('should handle NEW_WORRY action correctly', () => {
    const dirtyState = { ...initState, lv: MAX_LV, count: 100 }
    const state = surviveReducer(dirtyState, { type: 'NEW_WORRY', hasThing: true })
    expect(state.count).toBe(1)
    expect(state.notThing).toBe(0)
    expect(state.lv).toBe(1)
  })

  it('should handle CLOSE action correctly', () => {
    const state = { ...initState, lv: MAX_LV }
    const newState = surviveReducer(state, { type: 'CLOSE' })
    expect(newState).toEqual({ ...state, isOpen: false })
  })

  it('should handle RESET action correctly', () => {
    const dirtyState = { ...initState, lv: 3, count: 50 }
    const state = surviveReducer(dirtyState, { type: 'RESET' })
    expect(state).toEqual(initState)
  })
})
