import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Diff } from 'utility-types';

import {
  Input as JustInput,
  InputProps,
} from '&front/ui/components/form/input';

interface OwnProps {
  name: string;
}

type ComponentProps = Diff<InputProps, FieldRenderProps['input']>;

export const Input = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustInput {...componentProps} {...input} />}
  />
);
