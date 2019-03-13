import { useMemo } from 'react'
import { take, head } from 'lodash'
import { Option } from 'tsoption'
import { FetchingState } from 'redux-clear'

import { displayMoney } from '@shared/helpers/displayMoney'
import { HistoryGroupModel } from '@shared/models/money/HistoryGroupModel'
import { LoaderTable } from '@front/ui/components/layout/loader-table'

import { createColumns } from './helpers/createColumns'
import { FullHistoryButton } from './full-history-button/FullHistoryButton'

interface Props {
  className?: string
  maxCount: number
  history: Option<HistoryGroupModel[]>
  fetching: FetchingState
}

const columns = createColumns('category', 'Category')

export const Outcomes = ({ history, fetching, className, maxCount }: Props) => {
  const lastOutcomes = useMemo(
    () =>
      history
        .flatMap(items => Option.of(head(items)))
        .map(item => take(item.outcomes, maxCount))
        .map(incomes =>
          incomes.map(outcome => ({
            ...outcome,
            amount: displayMoney(outcome.currency)(outcome.amount),
          })),
        ),
    [history],
  )

  return (
    <LoaderTable
      title="Outcomes"
      className={className}
      data={lastOutcomes}
      columns={columns}
      expectedRows={maxCount}
      fetching={fetching}
      footer={<FullHistoryButton />}
    />
  )
}
