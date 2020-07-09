import { startOfYear, endOfYear } from 'date-fns';
import React, { useCallback } from 'react';
import { useStore, useGate } from 'effector-react';
import { Option } from 'tsoption';

import {
  historyToTableData,
  createColumns,
} from '&front/legacy_features/history';
import { wantUTC, DateRange } from '&front/shared';
import { LoaderTable } from '&front/legacy_ui/components/layout/loader-table';
import { useDelete } from '&front/legacy_features/transaction/delete/useDelete';
import {
  $shortHistory,
  HistoryGate,
  SHORT_HISTORY_MAX_LENGTH,
  $historyStatus,
} from '&front/application/transaction';

import { FullHistoryButton } from './components/full-history-button';

interface Props {
  className?: string;
}

const from = wantUTC(startOfYear)(new Date());
const to = wantUTC(endOfYear)(new Date());

export const History = ({ className }: Props) => {
  useGate(HistoryGate, DateRange.memoized(from, to));
  const history = useStore($shortHistory);
  const { isLoading } = useStore($historyStatus);

  const { handleDelete } = useDelete();
  const onRowClick = useCallback(({ id }) => handleDelete(id), [handleDelete]);

  const lastOutcomes = Option.of(
    historyToTableData(history.expenses, history.earnings),
  );

  return (
    <>
      <LoaderTable
        title="Последние транзакции"
        className={className}
        data={lastOutcomes}
        columns={createColumns('comment')}
        expectedRows={SHORT_HISTORY_MAX_LENGTH * 1.5}
        fetching={{ loading: isLoading }}
        footer={<FullHistoryButton />}
        onRowClick={onRowClick}
      />
    </>
  );
};
