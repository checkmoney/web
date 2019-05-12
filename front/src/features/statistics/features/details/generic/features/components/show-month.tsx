import { Button, ButtonType } from '@front/ui/components/form/button'
import { pushRoute } from '@front/features/routing'
import { GroupBy } from '@shared/enum/GroupBy'
import { useTranslation } from '@front/domain/i18n'

interface Props {
  group?: GroupBy
  detailType: string
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month
  const { t } = useTranslation()

  return showMonth ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}/month`)}
      type={ButtonType.Secondary}
    >
      {t('stats:details.show-month')}
    </Button>
  ) : null
}
