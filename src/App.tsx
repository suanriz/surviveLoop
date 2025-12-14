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
      <header className='2ext-xl text-white absolute -z-1'>
        <h1>人生迴圈 - 擔心模擬器</h1>
      </header>

      <main className='min-w-full h-full flex flex-col items-center justify-center p-4'>
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
      </main>
      <a
        className='absolute bottom-2 right-2 w-10 opacity-20 hover:opacity-100 z-100'
        href='https://github.com/suanriz/surviveLoop'
        target='_blank'
        rel='noreferrer'
        aria-label='GitHub Repository'
      >
        <img src={githubMark} width={40} height={39} fetchPriority='high' loading='eager' decoding='async' alt='github' />
      </a>

      <footer className='sr-only'>
        <p>Copyright © {new Date().getFullYear()} Survive Loop</p>
      </footer>
    </>
  )
}

export default App
