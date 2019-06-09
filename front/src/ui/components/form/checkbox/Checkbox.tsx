import { Checkbox as AntCheckbox } from 'antd'
import React, { useCallback } from 'react'

import { useCustomInput } from '@front/ui/hooks/useCustomInput'

import { CheckboxProps } from './CheckboxProps'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

export const Checkbox = ({ value, onChange, children }: CheckboxProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange)

  const antOnChange = useCallback(
    (e: CheckboxChangeEvent) => {
      handleChange(e.target.checked)
    },
    [handleChange],
  )

  return (
    <AntCheckbox checked={!!currentValue} onChange={antOnChange}>
      {children}
    </AntCheckbox>
  )
}
