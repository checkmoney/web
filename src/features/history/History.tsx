import React, { useMemo } from 'react';

import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { Tab, Tabs } from '&front/ui/components/layout/tabs';
import { useEnvironment } from '&front/ui/hooks/useEnvironment';
import { useWindowSize } from '&front/ui/hooks/useWindowSize';
import { useMemoState } from '&front/domain/store';
import { Route } from '&front/app/router/router.types';
import { useBoundRouter } from '&front/app/router/router.utils';

import { TransactionList } from './components/transaction-list';
import { createMonths } from './helpers/createMonths';
import * as styles from './History.css';

export const History = () => {
  const firstTransactionDate = useMemoState(
    () => getFirstTransactionDate,
    fetchFirstTransactionDate,
    [],
  );
  const { isClient } = useEnvironment();
  const { pushRoute } = useBoundRouter(Route.Dashboard);

  const months = useMemo(() => createMonths(firstTransactionDate, new Date()), [
    firstTransactionDate,
  ]);
  const defaultMonthTitle = useMemo(() => translatedMonthTitle(new Date()), []);

  const { innerWidth } = useWindowSize();
  const isMobile = innerWidth && innerWidth < 768;

  return (
    <Container>
      <PageHeader title="История" onBack={pushRoute} />

      {isClient && (
        <Tabs
          className={styles.tabs}
          defaultSelected={defaultMonthTitle}
          vertical={!isMobile}
        >
          {months.map((month) => (
            <Tab
              title={month.title}
              className={styles.history}
              key={month.title}
            >
              <TransactionList
                from={month.from}
                to={month.to}
                classNames={styles}
              />
            </Tab>
          ))}
        </Tabs>
      )}
    </Container>
  );
};
