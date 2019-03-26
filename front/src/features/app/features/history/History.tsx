import { endOfMonth, startOfMonth } from 'date-fns'
import { useMappedState } from 'redux-react-hook'
import { useMemo } from 'react'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { GroupBy } from '@shared/enum/GroupBy'
import { wantUTC } from '@front/helpers/wantUTC'
import { LoaderTable } from '@front/ui/components/layout/loader-table'
import { historyToTableData, createColumns } from '@front/features/history'

import { FullHistoryButton } from './components/full-history-button'

interface Props {
  className?: string
}

const groupBy = GroupBy.Month
const historyLength = 10
const from = wantUTC(startOfMonth)(new Date())
const to = wantUTC(endOfMonth)(new Date())
const columns = createColumns('comment', 'Comment')

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus)

  const history = useMemoState(
    () => getHistory(from, to, groupBy),
    () => fetchHistory(from, to, groupBy),
    [from, to],
  )

  const lastOutcomes = useMemo(
    () => historyToTableData(history, { maxLength: historyLength }),
    [history],
  )

  return (
    <LoaderTable
      title="Last transactions"
      className={className}
      data={lastOutcomes}
      columns={columns}
      expectedRows={historyLength * 1.5}
      fetching={fetching}
      footer={<FullHistoryButton />}
    />
  )
}
