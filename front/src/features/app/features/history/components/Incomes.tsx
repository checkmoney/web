import { FetchingState } from 'redux-clear'
import { useMemo } from 'react'
import { take, head } from 'lodash'
import { Option } from 'tsoption'

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

const columns = createColumns('source', 'Source')

export const Incomes = ({ fetching, history, className, maxCount }: Props) => {
  const lastIncomes = useMemo(
    () =>
      history
        .flatMap(items => Option.of(head(items)))
        .map(item => take(item.incomes, maxCount))
        .map(incomes =>
          incomes.map(income => ({
            ...income,
            amount: displayMoney(income.currency)(income.amount),
          })),
        ),
    [history],
  )

  return (
    <LoaderTable
      title="Incomes"
      data={lastIncomes}
      columns={columns}
      fetching={fetching}
      expectedRows={maxCount}
      className={className}
      footer={<FullHistoryButton />}
    />
  )
}
