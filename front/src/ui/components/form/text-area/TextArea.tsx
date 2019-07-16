import React from 'react'
import { Input as AntInput } from 'antd'

const AntTextArea = AntInput.TextArea

import { useCustomInput } from '&front/ui/hooks/useCustomInput'

import { TextAreaProps } from './TextAreaProps'
import { useCallback, ChangeEvent } from 'react'

export const TextArea = ({ value, onChange, rows }: TextAreaProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange)

  const antOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value)
    },
    [handleChange],
  )

  return <AntTextArea value={currentValue} onChange={antOnChange} rows={rows} />
}
