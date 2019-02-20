import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  InputMoney as JustInputMoney,
  InputMoneyProps,
} from '@front/ui/components/form/input-money'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<InputMoneyProps, FieldRenderProps['input']>

export const InputMoney = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustInputMoney {...input} {...componentProps} />}
  />
)
