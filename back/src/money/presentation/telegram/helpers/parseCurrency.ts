import { UnexpectedParameterException } from '&back/utils/infrastructure/exception/UnexpectedParameterException';
import { Currency } from '&shared/enum/Currency';

export const parseCurrency = (rawCurrency: string): Currency => {
  const transformedCurrency = rawCurrency.toUpperCase();

  if (!Object.values(Currency).includes(transformedCurrency)) {
    throw new UnexpectedParameterException(
      'currency',
      `"${rawCurrency}" is invalid currency, please use one of follow insted: ${Object.values(
        Currency,
      ).join(', ')}`,
    );
  }

  return transformedCurrency as Currency;
};
