import * as Handlebars from 'handlebars';

import { Currency } from '&shared/enum/Currency';
import { displayMoney } from '&shared/helpers/displayMoney';

export const money = (amount: number, currency: Currency) =>
  new Handlebars.SafeString(displayMoney(currency)(amount));
