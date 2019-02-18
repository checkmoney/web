import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { getCurrencySign } from '@front/helpers/getCurrencySign'

import { Input } from '../input'
import { format } from './helpers/format'
import { parse } from './helpers/parse'
import { InputMoneyProps } from './InputMoneyProps'

export const InputMoney = ({
  currency,
  value,
  onChange,
  ...props
}: InputMoneyProps) => {
  const [currentValue, changeCurrentValue] = useState(value)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = parse(e.target.value)

      if (onChange) {
        // controlled
        e.target.value = newValue
        onChange(e)
      } else {
        // uncontrolled
        changeCurrentValue(newValue)
      }
    },
    [onChange],
  )

  useEffect(
    () => {
      changeCurrentValue(value || '')
    },
    [value],
  )

  return (
    <Input
      onChange={handleChange}
      value={format(currentValue)}
      addonBefore={getCurrencySign(currency)}
      {...props}
    />
  )
}
