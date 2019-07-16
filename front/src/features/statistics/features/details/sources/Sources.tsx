import React from 'react'

import { GroupBy } from '$shared/enum/GroupBy'
import { fetchStatsSources } from '$front/domain/money/actions/fetchStatsSources'
import { getStatsSources } from '$front/domain/money/selectors/getStatsSources'
import { useTranslation } from '$front/domain/i18n'

import { Detail } from '../generic'

interface Props {
  group?: GroupBy
}

export const Sources = ({ group }: Props) => {
  const { t } = useTranslation()

  return (
    <Detail
      detailType="sources"
      detailTitle={t('common:nav.sources')}
      fetchData={fetchStatsSources}
      getData={getStatsSources}
      toAmount={({ income }) => income}
      toData={({ source, income }) => ({
        name: source,
        data: income,
      })}
      group={group}
    />
  )
}
