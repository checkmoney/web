import React from 'react'

import { useTranslation } from '@front/domain/i18n'

interface Props {
  className?: string
}

export const HelloMessage = ({ className }: Props) => {
  const { t } = useTranslation()

  return <p className={className}>{t('landing:hello')}</p>
}
