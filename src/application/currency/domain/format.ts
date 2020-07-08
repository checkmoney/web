import { NON_BREAKING_SPACE } from '&front/shared';

import { Currency, getCurrencySign } from './data';

interface Params {
  withPenny?: boolean;
  withSign?: boolean;
}

const defaultParams = {
  withPenny: false,
  withSign: false,
};

export const formatMoney = (
  currency?: Currency,
  params: Params = defaultParams,
) => (amount: number | string | undefined) => {
  const actualParams = {
    ...defaultParams,
    ...params,
  };

  const numberAmount = Number(amount || 0);

  const formattedAmount = (numberAmount / 100)
    .toFixed(actualParams.withPenny ? 2 : 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NON_BREAKING_SPACE);

  const additionalSign = params.withSign && numberAmount > 0 ? '+' : '';

  const currencySign = currency ? getCurrencySign(currency) : '';

  return `${additionalSign}${formattedAmount}${NON_BREAKING_SPACE}${currencySign}`;
};
