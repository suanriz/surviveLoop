import React, { memo } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { WORRY_DETAIL } from '@/lib/constants'

const AchievementList: React.FC<{ unlockedIds: string[] }> = ({ unlockedIds }) => {
  const isUnlocked = (key: string) => unlockedIds.includes(key)

  return (
    <div className={'mt-10 text-center max-w-[400px]'}>
      <p className='text-sm text-stone-400'>
        成就解鎖進度：{unlockedIds.length} / 8
      </p>
      <div className='flex flex-wrap justify-center gap-2 mt-2'>
        {Object.entries(WORRY_DETAIL).map(([key, detail]) => (parseInt(key) < 80 || isUnlocked(key)) && (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <button
                className={`!text-xs !px-2 !py-1 !rounded !border-0 cursor-default focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isUnlocked(key)
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-600'
                }`}
                aria-label={isUnlocked(key) ? `成就: ${detail.achievement}` : '成就鎖定'}
              >
                {isUnlocked(key) ? '🏆' : '🔒'} {isUnlocked(key) ? detail.achievement : `${key}% - ${parseInt(key) + 10}%`}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`機率: ${detail.probability}%`}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default memo(AchievementList)
