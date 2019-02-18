import { useCallback } from 'react'

import { Option } from '../Option/Option'
import { Select } from '../Select/Select'
import { EnumSelectProps } from './EnumSelectProps'

export const EnumSelect = ({
  options,
  getLabel,
  ...props
}: EnumSelectProps) => {
  const createLabel = useCallback(
    (value: string) => {
      if (getLabel) {
        return getLabel(value)
      }

      return value
    },
    [getLabel],
  )

  return (
    <Select {...props}>
      {Object.values(options).map(value => (
        <Option value={value} key={value}>
          {createLabel(value)}
        </Option>
      ))}
    </Select>
  )
}
