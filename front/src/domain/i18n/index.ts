import NextI18Next from 'next-i18next'
import { Language } from '@shared/enum/Language'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: Language.Ru,
  otherLanguages: [Language.Never],
})

export const { appWithTranslation, withNamespaces, i18n } = NextI18NextInstance

export { Namespace } from './Namespace'
export { I18nProps } from './I18nProps'
