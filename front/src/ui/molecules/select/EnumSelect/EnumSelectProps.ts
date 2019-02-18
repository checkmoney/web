import { Omit } from 'utility-types'

import { SelectProps } from '../Select/SelectProps'

type PropsFromSelect = Omit<SelectProps, 'children'>

interface OwnProps {
  options: object
  getLabel?: (value: any) => string
}

export type EnumSelectProps = PropsFromSelect & OwnProps
