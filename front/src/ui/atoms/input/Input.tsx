import { Input as AntInput } from 'antd'
import { ChangeEvent, useCallback } from 'react'

import { InputProps } from './InputProps'

export const Input = ({ onChange, ...props }: InputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    },
    [onChange],
  )

  return <AntInput onChange={handleChange} {...props} />
}
