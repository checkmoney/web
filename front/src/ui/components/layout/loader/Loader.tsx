import { ReactNode } from 'react'
import { FetchingState } from 'redux-clear'

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
