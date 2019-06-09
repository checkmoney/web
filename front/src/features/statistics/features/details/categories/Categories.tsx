import React from 'react'

import { GroupBy } from '@shared/enum/GroupBy'
import { getStatsCategories } from '@front/domain/money/selectors/getStatsCategories'
import { fetchStatsCategories } from '@front/domain/money/actions/fetchStatsCategories'
import { useTranslation } from '@front/domain/i18n'

import { Detail } from '../generic'

interface Props {
  group?: GroupBy
}

export const Categories = ({ group }: Props) => {
  const { t } = useTranslation()

  return (
    <Detail
      detailType="categories"
      detailTitle={t('common:nav.categories')}
      fetchData={fetchStatsCategories}
      getData={getStatsCategories}
      toAmount={({ outcome }) => outcome}
      toData={({ category, outcome }) => ({
        name: category,
        data: outcome,
      })}
      group={group}
    />
  )
}
