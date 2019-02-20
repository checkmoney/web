import { Button as AntButton } from 'antd'

import { ButtonProps } from './ButtonProps'
import { resolveType } from './helpers/resolveType'

export const Button = ({
  submit = false,
  children,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => (
  <AntButton
    onClick={onClick}
    htmlType={resolveType(submit)}
    className={className}
    type="primary"
    disabled={disabled}
  >
    {children}
  </AntButton>
)
