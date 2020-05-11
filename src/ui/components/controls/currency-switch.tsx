import React, { useCallback } from 'react';

import { translatedCurrency } from '&front/helpers/translatedCurrency';
import { EnumSelect } from '&front/ui/components/form/select';
import { Currency } from '&shared/enum/Currency';

interface Props {
  currency: Currency;
  updateCurrency: (newCurrenct: Currency) => void;
}

export const CurrencySwitch = ({ currency, updateCurrency }: Props) => {
  const onChange = useCallback(
    (v?: string) => {
      updateCurrency((v as Currency) || currency);
    },
    [updateCurrency, currency],
  );

  return (
    <EnumSelect
      options={Currency}
      value={currency}
      onChange={onChange}
      showSearch
      getLabel={translatedCurrency}
    />
  );
};
