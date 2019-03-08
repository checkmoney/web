import { ReactNode } from 'react'
import { FetchingState } from 'redux-clear'
import { Skeleton } from '../../controls/skeleton/Skeleton'

interface Props {
  status: FetchingState
  children: ReactNode
  skeleton?: boolean
  expectedRows?: number
}

export const Loader = ({
  status: { loading, error },
  children,
  expectedRows,
  skeleton = false,
}: Props) => {
  if (skeleton && loading) {
    return <Skeleton rows={expectedRows} />
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error.nonEmpty()) {
    return <p>error: {error.get()}</p>
  }

  return <>{children}</>
}
