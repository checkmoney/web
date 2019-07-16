import React from 'react'

import { Button, ButtonType } from '&front/ui/components/form/button'
import { pushRoute } from '&front/features/routing'
import { GroupBy } from '&shared/enum/GroupBy'
import { useTranslation } from '&front/domain/i18n'

interface Props {
  group?: GroupBy
  detailType: string
}

export const ShowYear = ({ group, detailType }: Props) => {
  const showYear = !group || group !== GroupBy.Year
  const { t } = useTranslation()

  return showYear ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}/year`)}
      type={ButtonType.Secondary}
    >
      {t('stats:details.show-year')}
    </Button>
  ) : null
}
