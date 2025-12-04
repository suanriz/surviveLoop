export type SurviveStateType = {
  isOpen: boolean
  submit: boolean
  lv: number
  count: number
  notThing: number
  steps: number[]
}

export type SurviveAction =
  | { type: 'WORRY'; hasThing: boolean }
  | { type: 'NEW_WORRY'; hasThing: boolean }
  | { type: 'CLOSE' }
  | { type: 'RESET' }

export type RankDataType = {
  name: string
  count: number
  wisdom: number
  uid: string
  timestamp: number
}

export interface WinRankModelPropsType {
  winRankOpen: boolean
  setWinRankOpen: (open: boolean) => void
  modelConfig: SurviveStateType
  setRankOpen: (open: boolean) => void
}

export interface GameResultsPropsType {
  count: number
  notThing: number
  wisdom: number
  currentLevelKey: import('./constants').WorryDetailTypeKeys
  unlockedIds: string[]
  onOpenRank: () => void
  onNewWorry: () => void
}
