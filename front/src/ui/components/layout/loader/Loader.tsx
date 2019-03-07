import { ReactNode } from 'react'
import { FetchingState } from 'redux-clear'
import { Skeleton } from 'antd'

interface Props {
  status: FetchingState
  children: ReactNode
  skeleton?: boolean
}

export const Loader = ({
  status: { loading, error },
  children,
  skeleton = false,
}: Props) => {
  if (skeleton) {
    return <Skeleton loading={loading}>{children}</Skeleton>
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (error.nonEmpty()) {
    return <p>error: {error.get()}</p>
  }

  return <>{children}</>
}
