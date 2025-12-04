import { useEffect, useState } from 'react'

import githubMark from '@/assets/githubMark.svg'
import GameResults from '@/components/GameResults'
import RankModel from '@/components/RankModel'
import SurviveModel from '@/components/SurviveModel'
import WinRankModel from '@/components/WinRankModel'
import { useAchievements } from '@/hooks/useAchievements'
import { useRank } from '@/hooks/useRank'
import { useSurvive } from '@/hooks/useSurvive'
import { useUid } from '@/hooks/useUid'
import { MAX_LV } from '@/lib/constants'
import type { RankDataType } from '@/lib/type'
import { calcWisdom, getWorryDetailKey } from '@/lib/utils'

const EMPTY_ARRAY: RankDataType[] = []

const App = () => {
  const uid = useUid()
  const { unlock, unlockedIds } = useAchievements()
  const { state, worry, newWorry, close } = useSurvive()
  const { lv, count, notThing } = state
  const { data: topFive = EMPTY_ARRAY, isSuccess: isRankLoaded } = useRank(lv === MAX_LV)

  const [rankOpen, setRankOpen] = useState(false)
  const [winRankOpen, setWinRankOpen] = useState(false)

  const wisdom = calcWisdom(notThing, count)
  const currentLevelKey = getWorryDetailKey(wisdom)

  useEffect(() => {
    if (lv !== MAX_LV || !isRankLoaded) return

    const myRankCount = topFive.find(x => x.uid === uid)?.count ?? 0
    const fifthPlaceCount = topFive[4]?.count ?? 0
    const entersTop5 = count > myRankCount && count > fifthPlaceCount

    if (entersTop5) {
      setWinRankOpen(true)
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lv, isRankLoaded])

  useEffect(() => {
    if (lv === MAX_LV)
      unlock(currentLevelKey.toString())
  }, [lv, currentLevelKey, unlock])

  return (
    <>
      <section className='min-w-full h-full flex flex-col items-center justify-center p-4'>
        {
          lv === MAX_LV &&
          <GameResults
            count={count}
            notThing={notThing}
            wisdom={wisdom}
            currentLevelKey={currentLevelKey}
            unlockedIds={unlockedIds}
            onOpenRank={() => setRankOpen(true)}
            onNewWorry={() => newWorry()}
          />
        }
        <SurviveModel
          state={state}
          worry={worry}
          close={close}
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
      </section>
      <a
        className='absolute bottom-2 right-2 w-10 opacity-20 hover:opacity-100 z-100'
        href='https://github.com/suanriz/surviveLoop'
        target='_blank'
        rel='noreferrer'
      >
        <img src={githubMark} />
      </a>
    </>
  )
}

export default App
