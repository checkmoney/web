import { ReactChild, ReactFragment } from 'react'

import NextRoutes from '../routes'

interface Props {
  route?: string
  children: ReactChild | ReactFragment
}

export const Link = ({ children, ...props }: Props) => (
  <NextRoutes.Link {...props}>{children}</NextRoutes.Link>
)
