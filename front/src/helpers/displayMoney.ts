import { Currency } from '@shared/enum/Currency'

import { getCurrencySign } from './getCurrencySign'
import { NON_BREAKING_SPACE } from './NON_BREAKING_SPACE'

export const displayMoney = (amount: number, currency: Currency) => {
  const formattedAmount = (amount / 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NON_BREAKING_SPACE)

  return `${getCurrencySign(currency)}${NON_BREAKING_SPACE}${formattedAmount}`
}
