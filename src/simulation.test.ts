import { describe, it, expect } from 'vitest'

import { MAX_LV } from '@/lib/constants'
import { calcWisdom } from '@/lib/utils'
import { surviveReducer, initState } from '@/reducers/surviveReducer'

const SIMULATION_TIMES = 1000000

// 排版填充空白： 中文 2 格，其他 1 格
const padVisual = (str: string, targetLen: number) => {
  let visualLen = 0
  for (let i = 0; i < str.length; i++) {
    visualLen += str.charCodeAt(i) > 255 ? 2 : 1
  }
  const padding = targetLen - visualLen
  return str + ' '.repeat(Math.max(0, padding))
}

describe('Luck Simulation', () => {
  it(`should simulate ${SIMULATION_TIMES} runs and print distribution`, () => {
    console.warn(`正在模擬 ${SIMULATION_TIMES.toLocaleString()} 次...`)

    const bins = new Array(10).fill(0)

    for (let i = 0; i < SIMULATION_TIMES; i++) {
      let state = initState

      while (state.lv < MAX_LV) {
        const hasThing = Math.random() < 0.5
        state = surviveReducer(state, { type: 'WORRY', hasThing })
      }

      const wisdom = calcWisdom(state.notThing, state.count)

      let binIndex = Math.floor(wisdom / 10)
      if (binIndex >= 10) binIndex = 9
      if (binIndex < 0) binIndex = 0

      bins[binIndex]++
    }

    const COL_WIDTH = 19
    const COL_PERCENT_WIDTH = 14

    console.warn(
      '\n' +
      padVisual('幸運值區間', COL_WIDTH) +
      padVisual('次數', COL_WIDTH) +
      padVisual('百分比', COL_PERCENT_WIDTH) +
      '長條圖'
    )

    for (let i = 0; i < 10; i++) {
      const range = `${i * 10}~${(i + 1) * 10}%`
      const count = bins[i]
      const countStr = `${count.toLocaleString()} 次`
      const percentage = (count / SIMULATION_TIMES) * 100
      const percentageStr = percentage.toFixed(2) + '%'
      let bar = '▋'.repeat(Math.round(percentage / 2))
      if (percentage > 0 && bar.length === 0) {
        bar = '▋'
      }

      console.warn(
        padVisual(range, COL_WIDTH) +
        padVisual(countStr, COL_WIDTH) +
        padVisual(percentageStr, COL_PERCENT_WIDTH) +
        bar
      )
    }

    expect(true).toBe(true)
  }, 60000)
})
