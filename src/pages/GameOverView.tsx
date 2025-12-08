import React, { useEffect, useState, memo } from 'react'

import GameResults from '@/components/GameResults'
import RankModel from '@/components/RankModel'
import WinRankModel from '@/components/WinRankModel'
import { useAchievements } from '@/hooks/useAchievements'
import { useRank } from '@/hooks/useRank'
import { useUid } from '@/hooks/useUid'
import { MAX_LV } from '@/lib/constants'
import type { SurviveStateType, RankDataType } from '@/lib/type'
import { calcWisdom, getWorryDetailKey } from '@/lib/utils'

const EMPTY_ARRAY: RankDataType[] = []

interface GameOverViewProps {
  state: SurviveStateType
  newWorry: () => void
  close: () => void
}

const GameOverView: React.FC<GameOverViewProps> = ({ state, newWorry, close }) => {
  const { count, notThing, lv } = state
  const uid = useUid()
  const { unlock, unlockedIds } = useAchievements()
  const { data: topFive = EMPTY_ARRAY, isSuccess: isRankLoaded } = useRank(true)

  const [rankOpen, setRankOpen] = useState(false)
  const [winRankOpen, setWinRankOpen] = useState(false)

  const wisdom = calcWisdom(notThing, count)
  const currentLevelKey = getWorryDetailKey(wisdom)

  useEffect(() => {
    if (!isRankLoaded || lv !== MAX_LV) return

    const myRankCount = topFive.find(x => x.uid === uid)?.count ?? 0
    const fifthPlaceCount = topFive[4]?.count ?? 0
    const entersTop5 = count > myRankCount && count > fifthPlaceCount

    if (entersTop5) {
      setWinRankOpen(true)
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRankLoaded, lv])

  useEffect(() => {
    unlock(currentLevelKey.toString())
  }, [currentLevelKey, unlock])

  return (
    <>
      <GameResults
        count={count}
        notThing={notThing}
        wisdom={wisdom}
        currentLevelKey={currentLevelKey}
        unlockedIds={unlockedIds}
        onOpenRank={() => setRankOpen(true)}
        onNewWorry={newWorry}
      />
      <RankModel
        rankData={topFive}
        rankOpen={rankOpen}
        setRankOpen={setRankOpen}
      />
      <WinRankModel
        winRankOpen={winRankOpen}
        setWinRankOpen={setWinRankOpen}
        modelConfig={state}
        setRankOpen={setRankOpen}
      />
    </>
  )
}

export default memo(GameOverView)
