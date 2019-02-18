import { Card as AntCard } from 'antd'
import { ReactNode } from 'react'

interface Props {
  className?: string
  title: string
  children: ReactNode
}

export const Card = ({ className, title, children }: Props) => (
  <AntCard title={title}>
    <article className={className}>{children}</article>
  </AntCard>
)
