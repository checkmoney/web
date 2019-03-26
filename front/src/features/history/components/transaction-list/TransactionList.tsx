import { useMappedState } from 'redux-react-hook'

import { getHistory } from '@front/domain/money/selectors/getHistory'
import { GroupBy } from '@shared/enum/GroupBy'
import { useMemoState } from '@front/domain/store'
import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { Loader } from '@front/ui/components/layout/loader'
import { Table } from '@front/ui/components/layout/table'

import { createColumns } from '../../helpers/createColumns'
import { historyToTableData } from '../../helpers/historyToTableData'

interface ClassNames {
  incomes: string
  outcomes: string
}

interface Props {
  from: Date
  to: Date
  classNames: ClassNames
}

export const TransactionList = ({ from, to, classNames }: Props) => {
  const history = useMemoState(
    () => getHistory(from, to, GroupBy.Month),
    () => fetchHistory(from, to, GroupBy.Month),
    [from, to],
  )

  const fetching = useMappedState(getHistoryFetchingStatus)

  const incomeColumns = createColumns('comment', 'Source')
  const incomes = historyToTableData(history, {
    filter: transaction => transaction.amount > 0,
  })

  const outcomesColumns = createColumns('comment', 'Category')
  const outcomes = historyToTableData(history, {
    filter: transaction => transaction.amount < 0,
  })

  return (
    <Loader status={fetching} dataAvaiable={history.nonEmpty()}>
      {outcomes.nonEmpty() && (
        <Table
          className={classNames.outcomes}
          title="Outcomes"
          columns={outcomesColumns}
          data={outcomes.get()}
        />
      )}
      {incomes.nonEmpty() && (
        <Table
          className={classNames.incomes}
          title="Incomes"
          columns={incomeColumns}
          data={incomes.get()}
        />
      )}
    </Loader>
  )
}
