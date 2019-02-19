import { Currency } from '@shared/enum/Currency'

import { getCurrencySign } from './getCurrencySign'
import { NON_BREAKING_SPACE } from './NON_BREAKING_SPACE'

export const displayMoney = (currency: Currency) => (
  amount: number | string | undefined,
  withPenny = true,
) => {
  const numberAmount = Number(amount || 0)

  const formattedAmount = (numberAmount / 100)
    .toFixed(withPenny ? 2 : 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NON_BREAKING_SPACE)

  return `${getCurrencySign(currency)}${NON_BREAKING_SPACE}${formattedAmount}`
}
