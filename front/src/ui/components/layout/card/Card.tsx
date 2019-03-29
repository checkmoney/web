import { Card as AntCard } from 'antd'
import { ReactNode } from 'react'

interface Props {
  className?: string
  title: string
  children: ReactNode
  extra?: ReactNode
  actions?: ReactNode[]
}

export const Card = ({ className, title, children, extra, actions }: Props) => (
  <AntCard title={title} extra={extra} actions={actions}>
    <article className={className}>{children}</article>
  </AntCard>
)
