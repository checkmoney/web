import React from 'react';
import { Field } from 'react-final-form';

import { Select as JustSelect, SelectProps } from '&front/presentation/atoms';

interface OwnProps {
  name: string;
}

export const Select = ({ name, ...componentProps }: OwnProps & SelectProps) => (
  <Field
    name={name}
    render={({ input }) => <JustSelect {...componentProps} {...input} />}
  />
);
