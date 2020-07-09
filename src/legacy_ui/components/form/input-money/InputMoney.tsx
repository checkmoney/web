import React from 'react';

import { useCustomInput } from '&front/legacy_ui/hooks/useCustomInput';
import { getCurrencySign } from '&front/application/currency';
import { Input } from '&front/presentation/atoms';

import { format } from './helpers/format';
import { InputMoneyProps } from './InputMoneyProps';

export const InputMoney = ({
  currency,
  value,
  onChange,
  ...props
}: InputMoneyProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  return (
    <Input
      onChange={handleChange}
      value={format(currentValue)}
      addonBefore={getCurrencySign(currency)}
      {...props}
    />
  );
};
