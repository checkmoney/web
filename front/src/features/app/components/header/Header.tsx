import { ReactNode } from 'react'

import * as styles from './Header.css'

interface Props {
  title: string
  children: ReactNode
}

export const Header = ({ title, children }: Props) => (
  <header className={styles.header}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </header>
)
