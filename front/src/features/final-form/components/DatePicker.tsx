import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  DatePicker as JustDatePicker,
  DatePickerProps,
} from '@front/ui/molecules/date-picker'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<DatePickerProps, FieldRenderProps['input']>

export const DatePicker = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustDatePicker {...componentProps} {...input} />}
  />
)
