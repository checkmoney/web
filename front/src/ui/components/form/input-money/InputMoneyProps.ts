import { Omit } from 'utility-types'

import { Currency } from '&shared/enum/Currency'

import { InputProps } from '../input'

type ExternalProps = Omit<InputProps, 'value' | 'addonAfter' | 'addonBefore'>

interface OwnProps {
  currency: Currency
  value?: string
}

export type InputMoneyProps = OwnProps & ExternalProps
