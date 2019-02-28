import { getCurrencySign } from '@shared/helpers/getCurrencySign'
import { useCustomInput } from '@front/ui/hooks/useCustomInput'

import { Input } from '../input'
import { format } from './helpers/format'
import { InputMoneyProps } from './InputMoneyProps'

export const InputMoney = ({
  currency,
  value,
  onChange,
  ...props
}: InputMoneyProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange)

  return (
    <Input
      onChange={handleChange}
      value={format(currentValue)}
      addonBefore={getCurrencySign(currency)}
      {...props}
    />
  )
}
