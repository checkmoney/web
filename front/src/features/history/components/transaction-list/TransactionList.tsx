import { useMappedState } from 'redux-react-hook'

import { getHistory } from '@front/domain/money/selectors/getHistory'
import { GroupBy } from '@shared/enum/GroupBy'
import { useMemoState } from '@front/domain/store'
import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { Loader } from '@front/ui/components/layout/loader'
import { Table } from '@front/ui/components/layout/table'
import { useIncomeModal } from '@front/features/transaction/income'
import { useOutcomeModal } from '@front/features/transaction/outcome'

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

  const { open: openIncome, IncomeModal } = useIncomeModal()
  const { open: openOutcome, OutcomeModal } = useOutcomeModal()

  return (
    <>
      <Loader status={fetching} dataAvaiable={history.nonEmpty()}>
        {outcomes.nonEmpty() && (
          <Table
            className={classNames.outcomes}
            title="Outcomes"
            columns={outcomesColumns}
            data={outcomes.get()}
            onRowClick={({ id }) => openOutcome(id)}
          />
        )}
        {incomes.nonEmpty() && (
          <Table
            className={classNames.incomes}
            title="Incomes"
            columns={incomeColumns}
            data={incomes.get()}
            onRowClick={({ id }) => openIncome(id)}
          />
        )}
      </Loader>
      <IncomeModal />
      <OutcomeModal />
    </>
  )
}
