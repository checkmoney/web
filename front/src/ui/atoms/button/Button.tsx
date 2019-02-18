import { Button as AntButton } from 'antd'

import { resolveType } from './helpers/resolveType'

interface Props {
  submit?: boolean
  children: string
  className?: string
}

export const Button = ({ submit = false, children, className }: Props) => (
  <AntButton htmlType={resolveType(submit)} className={className}>
    {children}
  </AntButton>
)
