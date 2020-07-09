import React, { useMemo } from 'react';
import { useRouter } from 'react-router5';
import { useGate, useStore } from 'effector-react';

import {
  FirstTransactionDateGate,
  $transactionsMeta,
} from '&front/application/transaction';
import { getTranslatedMonthTitle } from '&front/shared';
import { Container } from '&front/legacy_ui/components/layout/container';
import { PageHeader } from '&front/legacy_ui/components/layout/page-header';
import { Tab, Tabs } from '&front/legacy_ui/components/layout/tabs';
import { Route } from '&front/application/router';

import { TransactionList } from './components/transaction-list';
import { createMonths } from './helpers/createMonths';
import * as styles from './History.css';

export const History = () => {
  useGate(FirstTransactionDateGate);
  const { firstTransactionDate } = useStore($transactionsMeta);

  const { navigate } = useRouter();

  const months = useMemo(() => createMonths(firstTransactionDate, new Date()), [
    firstTransactionDate,
  ]);
  const defaultMonthTitle = useMemo(
    () => getTranslatedMonthTitle(new Date()),
    [],
  );

  return (
    <Container>
      <PageHeader title="История" onBack={() => navigate(Route.Dashboard)} />
      <Tabs className={styles.tabs} defaultSelected={defaultMonthTitle}>
        {months.map((month) => (
          <Tab title={month.title} className={styles.history} key={month.title}>
            <TransactionList
              from={month.from}
              to={month.to}
              classNames={styles}
            />
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};
