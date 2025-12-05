import React, { memo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { RANK_COLUMNS } from '@/lib/constants'
import type { RankDataType } from '@/lib/type'

interface RankModelProps {
  rankData: RankDataType[]
  rankOpen: boolean
  setRankOpen: (rankOpen: boolean) => void
}

const RankModel: React.FC<RankModelProps> = ({ rankData, rankOpen, setRankOpen }) => {

  return (
    <Dialog open={rankOpen} >
      <DialogContent className='[&>button]:hidden w-[420px] overflow-auto'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle className='text-xl mb-5'>長生排行</DialogTitle>
        </DialogHeader>
        <DialogDescription className='hidden' />
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              {RANK_COLUMNS.map(col => (
                <th key={col.key} className='px-4 py-3 text-center font-bold'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankData.map((item, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                {RANK_COLUMNS.map(col => (
                  <td key={col.key} className='px-4 py-3 text-center'>
                    {col.key === 'rank' && (
                      <span className='font-bold text-lg text-amber-600'>
                        {index + 1}
                      </span>
                    )}
                    {col.key !== 'wisdom' && item[col.key as keyof RankDataType]}
                    {col.key === 'wisdom' && (
                      <span className='text-green-600 font-medium'>
                        {item.wisdom.toFixed(2)}<small>%</small>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className='text-sm text-stone-200'>幸運排行？首先要活著…</p>
        <DialogFooter className='sm:justify-center'>
          <DialogClose asChild>
            <Button
              className='w-full'
              onClick={() => setRankOpen(false)}
            >
              面對人生
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

const arePropsEqual = (prev: RankModelProps, next: RankModelProps) => {
  if (prev.rankOpen !== next.rankOpen) return false
  if (!next.rankOpen) return true
  return prev.rankData === next.rankData
}

export default memo(RankModel, arePropsEqual)
