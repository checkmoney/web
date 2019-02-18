import { Button as AntButton } from 'antd'

import { resolveType } from './helpers/resolveType'

interface Props {
  submit?: boolean
  children: string
}

export const Button = ({ submit = false, children }: Props) => (
  <AntButton htmlType={resolveType(submit)}>{children}</AntButton>
)
