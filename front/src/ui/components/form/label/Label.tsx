import cx from 'classnames'
import React, { ReactNode, cloneElement } from 'react'

import { resolveContainerClassName } from './helpers/resolveContainerClassName'
import { resolveTextClassName } from './helpers/resolveTextClassName'
import * as styles from './Label.css'

interface Props {
  text: string
  children: ReactNode
  className?: string
  inline?: boolean
  inside?: boolean
}

export const Label = ({
  text,
  children,
  className,
  inline = false,
  inside = false,
}: Props) => {
  if (inside) {
    const anyChild = children as any
    return cloneElement(anyChild, anyChild.props, text)
  }

  return (
    <label className={cx(className, styles[resolveContainerClassName(inline)])}>
      <span className={styles[resolveTextClassName(inline)]}>{text}</span>
      {children}
    </label>
  )
}
