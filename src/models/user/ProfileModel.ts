import { Currency } from '&front/enum/Currency';

export interface ProfileModel {
  readonly defaultCurrency: Currency;
  readonly weekStartsOnMonday: boolean;
}
