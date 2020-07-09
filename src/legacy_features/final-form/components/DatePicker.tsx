import React from 'react';
import { Field } from 'react-final-form';

import {
  DatePicker as JustDatePicker,
  DatePickerProps,
} from '&front/legacy_ui/components/form/date-picker';

interface OwnProps {
  name: string;
}

export const DatePicker = ({
  name,
  ...componentProps
}: OwnProps & DatePickerProps) => (
  <Field
    name={name}
    render={({ input }) => <JustDatePicker {...componentProps} {...input} />}
  />
);
