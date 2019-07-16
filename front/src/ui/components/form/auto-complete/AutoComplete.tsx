import React, { useCallback, useEffect, useState } from 'react'
import { AutoComplete as AntAutoComplete } from 'antd'

import { useCustomInput } from '$front/ui/hooks/useCustomInput'

import { AutoCompleteProps } from './AutoCompleteProps'
import { filterOption } from './helpers/filterOption'
import { createHandleAutoComplete } from './helpers/createHandleAutoComplete'

export const AutoComplete = ({
  value,
  onChange,
  variants,
  placeholder,
}: AutoCompleteProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange)

  const handleAutoComplete = useCallback(
    createHandleAutoComplete(handleChange),
    [handleChange],
  )

  // hide hint if `currentValue` is empty
  const [dataSource, setDataSource] = useState<string[]>([])
  useEffect(() => {
    setDataSource(currentValue && currentValue.length ? variants : [])
  }, [currentValue, variants])

  return (
    <AntAutoComplete
      onChange={handleAutoComplete}
      value={currentValue}
      dataSource={dataSource}
      placeholder={placeholder}
      filterOption={filterOption}
    />
  )
}
