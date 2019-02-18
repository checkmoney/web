import { ReactNode } from 'react'

interface Props {
  text: string
  children: ReactNode
  after?: boolean
}

export const Label = ({ text, children, after = false }: Props) => (
  <label>
    {after ? (
      <>
        {children}
        {text}
      </>
    ) : (
      <>
        {text}
        {children}
      </>
    )}
  </label>
)
