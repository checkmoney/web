import { Currency } from '$shared/enum/Currency'

export const translatedCurrency = (t: (key: string) => string) => (
  currency: Currency,
): string => t(`currency:${currency}`)
