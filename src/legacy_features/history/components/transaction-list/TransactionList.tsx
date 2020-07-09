import { useGate, useStoreMap } from 'effector-react';
import React from 'react';

import { useDelete } from '&front/legacy_features/transaction/delete/useDelete';
import { Table } from '&front/legacy_ui/components/layout/table';
import { DateRange } from '&front/shared';
import {
  HistoryGate,
  $history,
  selectHistoryForDateRange,
} from '&front/application/transaction';

import { createColumns } from '../../helpers/createColumns';
import { historyToTableData } from '../../helpers/historyToTableData';

interface ClassNames {
  incomes: string;
  outcomes: string;
}

interface Props {
  from: Date;
  to: Date;
  classNames: ClassNames;
}

export const TransactionList = ({ from, to, classNames }: Props) => {
  const dateRange = DateRange.memoized(from, to);

  useGate(HistoryGate, dateRange);
  const history = useStoreMap({
    store: $history,
    keys: [dateRange],
    fn: selectHistoryForDateRange,
  });

  const incomeColumns = createColumns('comment', 'source');
  const incomes = historyToTableData([], history.earnings);

  const outcomesColumns = createColumns('comment', 'category');
  const outcomes = historyToTableData(history.expenses, []);

  const { handleDelete } = useDelete();

  return (
    <>
      <Table
        className={classNames.outcomes}
        title="Расходы"
        columns={outcomesColumns}
        data={outcomes}
        onRowClick={({ id }) => handleDelete(id)}
      />
      <Table
        className={classNames.incomes}
        title="Доходы"
        columns={incomeColumns}
        data={incomes}
        onRowClick={({ id }) => handleDelete(id)}
      />
    </>
  );
};
