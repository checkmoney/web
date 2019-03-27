import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  AutoComplete as JustAutoComplete,
  AutoCompleteProps,
} from '@front/ui/components/form/auto-complete'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<AutoCompleteProps, FieldRenderProps['input']>

export const AutoComplete = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustAutoComplete {...input} {...componentProps} />}
  />
)
