import React from 'react';
import { Field } from 'react-final-form';

import {
  InputMoney as JustInputMoney,
  InputMoneyProps,
} from '&front/legacy_ui/components/form/input-money';

interface OwnProps {
  name: string;
}

export const InputMoney = ({
  name,
  ...componentProps
}: OwnProps & InputMoneyProps) => (
  <Field
    name={name}
    render={({ input }) => <JustInputMoney {...input} {...componentProps} />}
  />
);
