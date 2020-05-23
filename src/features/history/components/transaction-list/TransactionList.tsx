import React from 'react';
import { useMappedState } from 'redux-react-hook';

import { fetchHistory } from '&front/domain/money/actions/fetchHistory';
import { getHistory } from '&front/domain/money/selectors/getHistory';
import { getHistoryFetchingStatus } from '&front/domain/money/selectors/getHistoryFetchingStatus';
import { useMemoState } from '&front/domain/store';
import { useDelete } from '&front/features/transaction/delete/useDelete';
import { Loader } from '&front/ui/components/layout/loader';
import { Table } from '&front/ui/components/layout/table';
import { GroupBy } from '&shared/enum/GroupBy';

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
  const history = useMemoState(
    () => getHistory(from, to, GroupBy.Month),
    () => fetchHistory(from, to, GroupBy.Month),
    [from, to],
  );

  const fetching = useMappedState(getHistoryFetchingStatus);

  const incomeColumns = createColumns('comment', 'source');
  const incomes = historyToTableData(history, {
    filter: (transaction) => transaction.amount > 0,
  });

  const outcomesColumns = createColumns('comment', 'category');
  const outcomes = historyToTableData(history, {
    filter: (transaction) => transaction.amount < 0,
  });

  const { handleDelete } = useDelete();

  return (
    <>
      <Loader status={fetching} dataAvaiable={history.nonEmpty()}>
        {outcomes.nonEmpty() && (
          <Table
            className={classNames.outcomes}
            title="Расходы"
            columns={outcomesColumns}
            data={outcomes.get()}
            onRowClick={({ id }) => handleDelete(id)}
          />
        )}
        {incomes.nonEmpty() && (
          <Table
            className={classNames.incomes}
            title="Доходы"
            columns={incomeColumns}
            data={incomes.get()}
            onRowClick={({ id }) => handleDelete(id)}
          />
        )}
      </Loader>
    </>
  );
};
