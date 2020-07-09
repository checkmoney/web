import React from 'react';
import { Field } from 'react-final-form';

import {
  AutoComplete as JustAutoComplete,
  AutoCompleteProps,
} from '&front/legacy_ui/components/form/auto-complete';

interface OwnProps {
  name: string;
}

export const AutoComplete = ({
  name,
  ...componentProps
}: OwnProps & AutoCompleteProps) => (
  <Field
    name={name}
    render={({ input }) => <JustAutoComplete {...input} {...componentProps} />}
  />
);
