import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  Toggle as JustToggle,
  ToggleProps,
} from '$front/ui/components/form/toggle'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<ToggleProps, FieldRenderProps['input']>

export const Toggle = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustToggle {...componentProps} {...input} />}
  />
)
