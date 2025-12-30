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

      <header className='text-2xl text-white absolute top-0 pointer-events-none select-none opacity-0'>
        <h1>人生迴圈 - 擔心模擬器</h1>
      </header>

      <footer className='absolute top-0 pointer-events-none select-none opacity-0'>
        <p>Copyright © {new Date().getFullYear()} Survive Loop</p>
      </footer>
    </>
  )
}

export default App
