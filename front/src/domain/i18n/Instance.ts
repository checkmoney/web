import NextI18Next from 'next-i18next'
import { Language } from '$shared/enum/Language'

export const Instance = new NextI18Next({
  defaultLanguage: Language.Ru,
  otherLanguages: [Language.Never],
})
