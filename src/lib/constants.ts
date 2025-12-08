export const WORRY_STEP = [
  '安心',
  '生病',
  '更糟',
  '死亡',
  '地獄',
  '油炸',
] as const
export type WorryStepType = typeof WORRY_STEP[number]
export type WorryStepTypeKeys = keyof typeof WORRY_STEP & number

export const MAX_LV = WORRY_STEP.length - 1

export const WORRY_DETAIL = {
  '0': {
    message: '你真是地獄非洲人，隨手一抽就是直達油鍋的單程票 🤷🏿‍♂️',
    achievement: '人生下限體驗師',
    probability: '3.11'
  },
  '10': {
    message: '鬼都嫌你麻煩，倒霉事跟著你跳恰恰 👻',
    achievement: '鬼見愁級倒楣家',
    probability: '3.47'
  },
  '20': {
    message: '運氣爛到爆，翻船翻到連船長都開始考慮轉職 🚢',
    achievement: '壞運纏身天天翻',
    probability: '5.30'
  },
  '30': {
    message: '手抖也要努力闖，一路慘叫一路拼命往前衝 🥶',
    achievement: '運氣低潮拚命撐',
    probability: '11.93'
  },
  '40': {
    message: '介於普通和倒楣之間，但小麻煩總是不請自來 😐',
    achievement: '努力自救打怪手',
    probability: '34.78'
  },
  '50': {
    message: '偶爾會神經刀爆擊，但撐過去就能笑著回頭看 😃',
    achievement: '神刀逆轉順勢上',
    probability: '39.24'
  },
  '60': {
    message: '煩惱看到你都退散，日子意外地順風順水 😎',
    achievement: '順境清風自在者',
    probability: '2.15'
  },
  '70': {
    message: '挑戰在你面前都像路邊吉祥物，被你輕鬆晃過去 🤹‍♂️',
    achievement: '歐皇天選神開局',
    probability: '0.02'
  },
  '80': {
    message: '這不是運氣，是 RNG 的背叛 ⚠️',
    achievement: '機率理論破壞者',
    probability: '0.00'
  },
  '90': {
    message: '恭喜，你修掉了一個根本不存在的問題 🧙‍♂️',
    achievement: 'Bug 幻術師',
    probability: '0.00'
  },
} as const
export type WorryDetailType = typeof WORRY_DETAIL
export type WorryDetailTypeKeys = keyof typeof WORRY_DETAIL

export const RANK_COLUMNS = [
  { label: '排名', key: 'rank' },
  { label: '名字', key: 'name' },
  { label: '劫數', key: 'count' },
  { label: '幸運值', key: 'wisdom' }
] as const
export type RankColumnsType = typeof RANK_COLUMNS
export type RankColumnsTypeKeys = keyof typeof RANK_COLUMNS
