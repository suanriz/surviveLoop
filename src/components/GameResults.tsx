import AchievementList from '@/components/AchievementList'
import { Button } from '@/components/ui/button'
import { WORRY_DETAIL } from '@/lib/constants'
import type { GameResultsPropsType } from '@/lib/type'

const GameResults: React.FC<GameResultsPropsType> = ({
  count,
  notThing,
  wisdom,
  currentLevelKey,
  unlockedIds,
  onOpenRank,
  onNewWorry,
}) => {
  return (
    <>
      <div className='text-center'>
        <h2>香酥脆的你，思考已下線 🍗</h2>
        <p>共遭遇 <span className='font-bold'>{count}</span> 次焦慮攻擊</p>
        <p>成功跨過 <span className='font-bold'>{notThing}</span> 次棘手難題 💪</p>
        <p className='text-lg font-bold my-2'>
          幸運值：
          <span className='text-xl'>
            {wisdom.toFixed(2)}%
          </span>
        </p>
        <p className='text-xl'>{WORRY_DETAIL[currentLevelKey]?.message}</p>
        <h3 className='text-lg mt-2 mb-4'>🎯 成就解鎖：「
          <span className='text-xl font-bold'>
            {WORRY_DETAIL[currentLevelKey]?.achievement}
          </span>」
        </h3>
      </div>

      <div className={'flex flex-wrap justify-center gap-4'}>
        <Button variant='outline' className='min-w-[11ch] max-[300px]:w-full' onClick={onOpenRank}>好運排行</Button>
        <Button className='min-w-[11ch] max-[300px]:w-full' onClick={onNewWorry}>擔心</Button>
      </div>

      <AchievementList unlockedIds={unlockedIds} />
    </>
  )
}

export default GameResults
