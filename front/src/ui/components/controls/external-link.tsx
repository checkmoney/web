import React, { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
}

export const ExternalLink = ({ href, children }: Props) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)
