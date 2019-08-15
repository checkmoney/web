import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Diff } from 'utility-types';

import {
  Select as JustSelect,
  SelectProps,
} from '&front/ui/components/form/select';

interface OwnProps {
  name: string;
}

type ComponentProps = Diff<SelectProps, FieldRenderProps['input']>;

export const Select = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustSelect {...componentProps} {...input} />}
  />
);
