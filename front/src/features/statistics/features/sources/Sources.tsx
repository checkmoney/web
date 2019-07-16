import { useMappedState } from 'redux-react-hook'
import React, { useMemo } from 'react'
import { sortBy, take } from 'lodash'

import { displayMoney } from '$shared/helpers/displayMoney'
import { Currency } from '$shared/enum/Currency'
import { GroupBy } from '$shared/enum/GroupBy'
import { useMemoState } from '$front/domain/store'
import { getStatsSources } from '$front/domain/money/selectors/getStatsSources'
import { fetchStatsSources } from '$front/domain/money/actions/fetchStatsSources'
import { getStatsSourcesFetchingStatus } from '$front/domain/money/selectors/getStatsSourcesFetchingStatus'
import { LoaderTable } from '$front/ui/components/layout/loader-table'
import { createRangeForGroup } from '$front/helpers/createRangeForGroup'
import { Button, ButtonType } from '$front/ui/components/form/button'
import { pushRoute } from '$front/features/routing'
import { useTranslation } from '$front/domain/i18n'

interface Props {
  className?: string
  currency: Currency
  group: GroupBy.Month | GroupBy.Year
  widthPercent: number
  maxLength: number
}

export const Sources = ({
  className,
  currency,
  group,
  widthPercent,
  maxLength,
}: Props) => {
  const { t } = useTranslation()

  const columns = useMemo(
    () => ({
      source: {
        title: 'Source',
        widthPercent,
      },
      income: {
        title: 'Amount',
        transform: displayMoney(currency),
      },
    }),
    [currency, widthPercent],
  )

  const fetching = useMappedState(getStatsSourcesFetchingStatus)

  const { from, to } = useMemo(() => createRangeForGroup(group), [group])

  const stats = useMemoState(
    () => getStatsSources(from, to, currency),
    () => fetchStatsSources(from, to, currency),
    [from, to, currency],
  )

  // sort by `income` and take `maxLength` top groups
  const preparedData = useMemo(
    () =>
      stats.map(s =>
        take(sortBy(s, transaction => -transaction.income), maxLength),
      ),
    [stats, maxLength],
  )

  return (
    <LoaderTable
      title={t('stats:top.income')}
      columns={columns}
      data={preparedData}
      fetching={fetching}
      expectedRows={maxLength}
      className={className}
      hideHeader
      footer={
        <Button
          type={ButtonType.Text}
          onClick={() => pushRoute(`/app/stats/sources/${group}`)}
        >
          {t('stats:actions.details')}
        </Button>
      }
    />
  )
}
