import { Button as AntButton } from 'antd'

import { resolveType } from './helpers/resolveType'

interface Props {
  submit?: boolean
  children: string
  className?: string
  onClick?: () => void
}

export const Button = ({
  submit = false,
  children,
  onClick,
  className,
}: Props) => (
  <AntButton
    onClick={onClick}
    htmlType={resolveType(submit)}
    className={className}
    type="primary"
  >
    {children}
  </AntButton>
)
