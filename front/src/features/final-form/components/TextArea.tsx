import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'
import { Diff } from 'utility-types'

import {
  TextArea as JustTextArea,
  TextAreaProps,
} from '$front/ui/components/form/text-area'

interface OwnProps {
  name: string
}

type ComponentProps = Diff<TextAreaProps, FieldRenderProps['input']>

export const TextArea = ({
  name,
  ...componentProps
}: OwnProps & ComponentProps) => (
  <Field
    name={name}
    render={({ input }) => <JustTextArea {...componentProps} {...input} />}
  />
)
