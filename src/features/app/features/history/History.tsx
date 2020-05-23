import { endOfMonth, startOfMonth } from 'date-fns';
import React, { useMemo, useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import { fetchHistory } from '&front/domain/money/actions/fetchHistory';
import { getHistory } from '&front/domain/money/selectors/getHistory';
import { getHistoryFetchingStatus } from '&front/domain/money/selectors/getHistoryFetchingStatus';
import { useMemoState } from '&front/domain/store';
import { historyToTableData, createColumns } from '&front/features/history';
import { wantUTC } from '&front/helpers/wantUTC';
import { LoaderTable } from '&front/ui/components/layout/loader-table';
import { useDelete } from '&front/features/transaction/delete/useDelete';
import { GroupBy } from '&shared/enum/GroupBy';

import { FullHistoryButton } from './components/full-history-button';

interface Props {
  className?: string;
}

const groupBy = GroupBy.Month;
const historyLength = 10;
const from = wantUTC(startOfMonth)(new Date());
const to = wantUTC(endOfMonth)(new Date());

export const History = ({ className }: Props) => {
  const fetching = useMappedState(getHistoryFetchingStatus);

  const history = useMemoState(
    () => getHistory(from, to, groupBy),
    () => fetchHistory(from, to, groupBy),
    [from, to],
  );

  const columns = createColumns('comment');

  const lastOutcomes = useMemo(
    () => historyToTableData(history, { maxLength: historyLength }),
    [history],
  );

  const { handleDelete } = useDelete();

  const onRowClick = useCallback(({ id }) => handleDelete(id), [handleDelete]);

  return (
    <>
      <LoaderTable
        title="Последние транзакции"
        className={className}
        data={lastOutcomes}
        columns={columns}
        expectedRows={historyLength * 1.5}
        fetching={fetching}
        footer={<FullHistoryButton />}
        onRowClick={onRowClick}
      />
    </>
  );
};
