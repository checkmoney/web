import { endOfMonth, startOfMonth } from 'date-fns'
import { useMappedState } from 'redux-react-hook'
import { useMemo, useCallback } from 'react'

import { fetchHistory } from '@front/domain/money/actions/fetchHistory'
import { getHistory } from '@front/domain/money/selectors/getHistory'
import { getHistoryFetchingStatus } from '@front/domain/money/selectors/getHistoryFetchingStatus'
import { useMemoState } from '@front/domain/store'
import { GroupBy } from '@shared/enum/GroupBy'
import { wantUTC } from '@front/helpers/wantUTC'
import { LoaderTable } from '@front/ui/components/layout/loader-table'
import { historyToTableData, createColumns } from '@front/features/history'
import { useIncomeModal } from '@front/features/transaction/income'
import { useOutcomeModal } from '@front/features/transaction/outcome'

import { FullHistoryButton } from './components/full-history-button'
import { useTranslation } from '@front/domain/i18n'

interface Props {
  className?: string
}

const groupBy = GroupBy.Month
const historyLength = 10
const from = wantUTC(startOfMonth)(new Date())
const to = wantUTC(endOfMonth)(new Date())

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus)
  const { t } = useTranslation()

  const history = useMemoState(
    () => getHistory(from, to, groupBy),
    () => fetchHistory(from, to, groupBy),
    [from, to],
  )

  const columns = createColumns(t, 'comment')

  const lastOutcomes = useMemo(
    () => historyToTableData(history, { maxLength: historyLength }),
    [history],
  )

  const { open: openIncome, IncomeModal } = useIncomeModal()
  const { open: openOutcome, OutcomeModal } = useOutcomeModal()

  const onRowClick = useCallback(
    ({ id, rawAmount }) => {
      if (rawAmount < 0) {
        openOutcome(id)
      } else {
        openIncome(id)
      }
    },
    [openIncome, openOutcome],
  )

  return (
    <>
      <LoaderTable
        title={t('short-history:title')}
        className={className}
        data={lastOutcomes}
        columns={columns}
        expectedRows={historyLength * 1.5}
        fetching={fetching}
        footer={<FullHistoryButton />}
        onRowClick={onRowClick}
      />
      <IncomeModal />
      <OutcomeModal />
    </>
  )
}
