import { createContext } from 'react'

import { I18nProps } from './I18nProps'

const defaultContext = {
  t: () => 'error',
}

export const I18nContext = createContext<I18nProps>(defaultContext)
