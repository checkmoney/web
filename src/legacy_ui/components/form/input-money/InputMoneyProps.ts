import { Omit } from 'utility-types';

import { Currency } from '&front/application/currency';
import { InputProps } from '&front/presentation/atoms';

type ExternalProps = Omit<InputProps, 'value' | 'addonAfter' | 'addonBefore'>;

interface OwnProps {
  currency: Currency;
  value?: string;
}

export type InputMoneyProps = OwnProps & ExternalProps;
