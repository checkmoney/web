import { ReactNode } from 'react'

import * as styles from './Label.css'

interface Props {
  text: string
  children: ReactNode
  className?: string
}

export const Label = ({ text, children, className }: Props) => (
  <label className={className}>
    <span className={styles.text}>{text}</span>
    {children}
  </label>
)
