import { Currency } from '&shared/enum/Currency'

import { getCurrencySign } from './getCurrencySign'
import { NON_BREAKING_SPACE } from './NON_BREAKING_SPACE'

interface Params {
  withPenny?: boolean
  withSign?: boolean
}

const defaultParams = {
  withPenny: true,
  withSign: false,
}

export const displayMoney = (currency: Currency) => (
  amount: number | string | undefined,
  params: Params = defaultParams,
) => {
  const actualParams = {
    ...defaultParams,
    ...params,
  }

  const numberAmount = Number(amount || 0)

  const formattedAmount = (numberAmount / 100)
    .toFixed(actualParams.withPenny ? 2 : 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NON_BREAKING_SPACE)

  const additionalSign = params.withSign && numberAmount > 0 ? '+' : ''

  return `${additionalSign}${formattedAmount}${NON_BREAKING_SPACE}${getCurrencySign(
    currency,
  )}`
}
