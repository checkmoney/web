import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  EnumSelect as JustEnumSelect,
  EnumSelectProps,
} from '$front/ui/components/form/select'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<EnumSelectProps, FieldRenderProps['input']>

export const EnumSelect = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustEnumSelect {...componentProps} {...input} />}
  />
)
