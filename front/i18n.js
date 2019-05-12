const NextI18Next = require('next-i18next')

// TODO: duplicate code of src/domain/i18n

module.exports = new NextI18Next({
  defaultLanguage: 'ru',
  otherLanguages: ['never-lang'],
})
