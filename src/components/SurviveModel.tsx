import { useEffect, useState, memo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { WORRY_STEP } from '@/lib/constants'
import { type WorryStepTypeKeys, MAX_LV } from '@/lib/constants'
import type { SurviveStateType } from '@/lib/type'

const SurviveModel: React.FC<{ state: SurviveStateType, worry: () => void, close: () => void }> = ({ state, worry, close }) => {
  const { isOpen, lv, count, steps } = state
  const [liveBtnShow, setLiveBtnShow] = useState(false)

  useEffect(() => {
    if (lv !== MAX_LV) {
      setLiveBtnShow(false)
      return
    }

    const timer = setTimeout(() => setLiveBtnShow(true), 1000)
    return () => clearTimeout(timer)
  }, [lv])

  return (
    <Dialog open={isOpen}>
      <DialogContent className='[&>button]:hidden h-[30%] grid-rows-[auto_1fr]'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between flex-wrap'>
            <span className={`text-xl leading-9 ${lv === 0 && 'text-green-600'}`}>
              {steps.length === 0
                ? '介於健康與生病之間'
                : `(${count}) ${lv === 0 ? '沒什麼好擔心' : WORRY_STEP[lv as WorryStepTypeKeys]}`
              }
            </span>
            <span>
              {lv !== MAX_LV &&
                <Button onClick={() => worry()}>擔心</Button>
              }
              {liveBtnShow &&
                <DialogClose asChild>
                  <Button onClick={() => close()}>人生概論</Button>
                </DialogClose>
              }
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='hidden' />
        <div className='bg-gray-100 rounded-b-lg px-2 py-3 overflow-auto'>
          {steps.length > 0
            ? <div className='grid grid-cols-4 gap-4'>
              {steps.map((step, index) => (
                <div key={index} className='flex items-center justify-center'>
                  <span className={`${step === 0 ? 'bg-green-600' : 'bg-gray-400'} relative w-[22px] h-[18px] leading-[18px] rounded-md mr-2 text-xs text-white text-center before:content-[attr(data-index)]`}>{steps.length - index}</span>
                  <span className={`${step === 0 && 'text-green-600'}`} >{WORRY_STEP[step as WorryStepTypeKeys]}</span>
                </div>
              ))}
            </div>
            : <p className='text-center text-lg'>薛定諤 /ᐠ - ˕ -マ</p>
          }
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default memo(SurviveModel)