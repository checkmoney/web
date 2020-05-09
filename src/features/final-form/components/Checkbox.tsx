import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Diff } from 'utility-types';

import {
  Checkbox as JustCheckbox,
  CheckboxProps,
} from '&front/ui/components/form/checkbox';

interface OwnProps {
  name: string;
}

type ComponentProps = Diff<CheckboxProps, FieldRenderProps['input']>;

export const Checkbox = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustCheckbox {...componentProps} {...input} />}
  />
);
