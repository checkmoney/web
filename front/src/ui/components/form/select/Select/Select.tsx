import React from 'react'
import { Select as AntSelect } from 'antd'

import { useCustomInput } from '&front/ui/hooks/useCustomInput'

import { filterOption } from './helpers/filterOption'
import { SelectProps } from './SelectProps'

const AntOption = AntSelect.Option

export const Select = ({
  children,
  showSearch = false,
  value,
  onChange,
}: SelectProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange)

  return (
    <AntSelect
      showSearch={showSearch}
      value={currentValue}
      onChange={handleChange}
      filterOption={filterOption}
    >
      {children.map(child => (
        <AntOption key={child.props.value} {...child.props} />
      ))}
    </AntSelect>
  )
}
