import { useEffect, useState, memo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Field,
  FieldGroup,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useUpdateRank } from '@/hooks/useRank'
import type { WinRankModelPropsType } from '@/lib/type'
import { calcWisdom } from '@/lib/utils'

const WinRankModel: React.FC<WinRankModelPropsType> = ({
  winRankOpen,
  setWinRankOpen,
  modelConfig,
  setRankOpen
}) => {
  const [name, setName] = useState('')
  const updateRankMutation = useUpdateRank()

  const wisdom = calcWisdom(modelConfig.notThing, modelConfig.count)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateRankMutation.mutate(
      {
        name: name.trim(),
        count: modelConfig.count,
        wisdom,
      },
      {
        onSuccess: () => {
          setWinRankOpen(false)
          setName('')
          setRankOpen(true)
        },
      }
    )
  }

  useEffect(() => {
    if (modelConfig.submit) setWinRankOpen(true)
  }, [modelConfig.submit, setWinRankOpen])

  return (
    <Dialog open={winRankOpen}>
      <DialogContent className='[&>button]:hidden w-[420px]'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle className='text-xl mb-1'>恭喜進入排行</DialogTitle>
        </DialogHeader>
        <DialogDescription className='hidden' />
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field orientation='horizontal' className='mb-5 justify-center' >
                <Input
                  placeholder='請輸入名子(限5字)'
                  value={name}
                  onChange={e => setName(e.target.value.trim())}
                  maxLength={5}
                  required
                  className='!bg-white border-0 border-b-1 rounded-none max-w-[10em] shadow-none'
                  aria-label='輸入名字'
                />
              </Field>
              <Field orientation='responsive'>
                <Button type='submit'>確認</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog >
  )
}

const arePropsEqual = (prev: WinRankModelPropsType, next: WinRankModelPropsType) => {
  if (prev.winRankOpen !== next.winRankOpen) return false
  if (!next.winRankOpen) return true
  return prev.modelConfig === next.modelConfig
}

export default memo(WinRankModel, arePropsEqual)
