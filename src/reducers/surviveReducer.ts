import { MAX_LV } from '@/lib/constants'
import type { SurviveStateType, SurviveAction } from '@/lib/type'

const worryAbout = (
  baseState: SurviveStateType,
  hasThing: boolean
): SurviveStateType => {
  const isFirstOpen = !baseState.isOpen && baseState.steps.length > 0
  const newCount = isFirstOpen ? 1 : baseState.count + 1
  const newLv = hasThing
    ? (baseState.lv + 1 < MAX_LV + 1 ? baseState.lv + 1 : 1)
    : 0

  const newSteps = isFirstOpen ? [newLv] : [newLv, ...baseState.steps]
  const newNotThing = isFirstOpen
    ? (newLv === 0 ? 1 : 0)
    : baseState.notThing + (newLv === 0 ? 1 : 0)

  const shouldSubmit = false

  return {
    ...baseState,
    isOpen: !shouldSubmit,
    submit: shouldSubmit,
    count: newCount,
    lv: newLv,
    steps: newSteps,
    notThing: newNotThing,
  }
}

export const initState: SurviveStateType = {
  isOpen: true,
  submit: false,
  lv: 0,
  count: 0,
  notThing: 0,
  steps: [],
}

export const surviveReducer = (
  state: SurviveStateType,
  action: SurviveAction
): SurviveStateType => {
  switch (action.type) {

    case 'WORRY':
      return worryAbout(state, action.hasThing)

    case 'NEW_WORRY':
      return worryAbout(initState, action.hasThing)

    case 'CLOSE':
      return { ...state, isOpen: false }

    case 'RESET':
      return initState

    default:
      return state
  }
}
