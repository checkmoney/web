import cx from 'classnames'
import { ReactNode } from 'react'

import { resolveContainerClassName } from './helpers/resolveContainerClassName'
import { resolveTextClassName } from './helpers/resolveTextClassName'
import * as styles from './Label.css'

interface Props {
  text: string
  children: ReactNode
  className?: string
  inline?: boolean
}

export const Label = ({ text, children, className, inline = false }: Props) => (
  <label className={cx(className, styles[resolveContainerClassName(inline)])}>
    <span className={styles[resolveTextClassName(inline)]}>{text}</span>
    {children}
  </label>
)
