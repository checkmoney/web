import { useCallback, useEffect, useState } from 'react'

export const useCustomInput = <Value>(
  value: Value,
  onChange?: (v: Value) => void,
) => {
  const [currentValue, changeCurrentValue] = useState(value)

  const handleChange = useCallback(
    (newValue: Value) => {
      if (onChange) {
        // controlled
        onChange(newValue)
      }

      // uncontrolled
      changeCurrentValue(newValue)
    },
    [onChange],
  )

  useEffect(
    () => {
      changeCurrentValue(value)
    },
    [value],
  )

  return {
    currentValue,
    handleChange,
  }
}
