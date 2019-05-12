import { useTranslation } from '@front/domain/i18n'

interface Props {
  className?: string
}

export const ForbiddenMessage = ({ className }: Props) => {
  const { t } = useTranslation()

  return <p className={className}>{t('landing:forbidden')}</p>
}
