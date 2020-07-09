import React, { ComponentType } from 'react';

import { EnumSelect } from '&front/presentation/molecules';

import { Currency, getCurrencyName } from '../../../domain/data';
import { CurrencySelectProps } from './currency_select.types';

export const CurrencySelect: ComponentType<CurrencySelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <EnumSelect
      options={Currency}
      value={value}
      onChange={onChange}
      showSearch
      getLabel={getCurrencyName}
    />
  );
};
