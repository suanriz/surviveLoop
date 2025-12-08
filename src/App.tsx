import { Suspense, lazy } from 'react'

import githubMark from '@/assets/githubMark.svg'
import SurviveModel from '@/components/SurviveModel'
import { useSurvive } from '@/hooks/useSurvive'
import { MAX_LV } from '@/lib/constants'

const GameOverView = lazy(() => import('@/pages/GameOverView'))

const App = () => {
  const { state, worry, newWorry, close } = useSurvive()
  const { lv } = state

  return (
    <>
      <section className='min-w-full h-full flex flex-col items-center justify-center p-4'>
        <h1 className='sr-only'>Survive Loop 人生迴圈</h1>
        {
          lv === MAX_LV && (
            <Suspense fallback={null}>
              <GameOverView
                state={state}
                newWorry={newWorry}
                close={close}
              />
            </Suspense>
          )
        }
        <SurviveModel
          state={state}
          worry={worry}
          close={close}
        />
      </section>
      <a
        className='absolute bottom-2 right-2 w-10 opacity-20 hover:opacity-100 z-100'
        href='https://github.com/suanriz/surviveLoop'
        target='_blank'
        rel='noreferrer'
        aria-label='GitHub Repository'
      >
        <img src={githubMark} alt='github' />
      </a>
    </>
  )
}

export default App
