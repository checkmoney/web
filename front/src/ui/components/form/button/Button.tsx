import { Button as AntButton } from 'antd'
import cx from 'classnames'
import React from 'react'

import { ButtonProps } from './ButtonProps'
import { resolveType } from './helpers/resolveType'
import { resolveClassName } from './helpers/resolveClassName'
import { ButtonType } from './ButtonType'
import * as styles from './Button.css'
import { resolveAntdType } from './helpers/resolveAntdType'

export const Button = ({
  submit = false,
  children,
  onClick,
  className,
  disabled = false,
  type = ButtonType.Primary,
}: ButtonProps) => (
  <AntButton
    onClick={onClick}
    htmlType={resolveType(submit)}
    className={cx(className, (styles as any)[resolveClassName(type)])}
    type={resolveAntdType(type) as any}
    disabled={disabled}
  >
    {children}
  </AntButton>
)
