import React from 'react';
import { Field } from 'react-final-form';

import {
  Toggle as JustToggle,
  ToggleProps,
} from '&front/legacy_ui/components/form/toggle';

interface OwnProps {
  name: string;
}

export const Toggle = ({ name, ...componentProps }: OwnProps & ToggleProps) => (
  <Field
    name={name}
    render={({ input }) => <JustToggle {...componentProps} {...input} />}
  />
);
