import { ReactNode } from 'react'

import { FetchingState } from '@front/domain/fetching-redux'

interface Props {
  status: FetchingState
  children: ReactNode
}

export const Loader = ({ status: { loading, error }, children }: Props) => {
  if (loading) {
    return <p>loading...</p>
  }

  if (error.nonEmpty()) {
    return <p>error: {error.get()}</p>
  }

  return <>{children}</>
}
