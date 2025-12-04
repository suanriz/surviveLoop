import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import App from './App.tsx'
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10
    },
  },
})

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const isSuccess = query.state.status === 'success'
            const shouldPersist = query.queryKey[0] === 'achievements'
            return isSuccess && shouldPersist
          },
        },
      }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>
)
