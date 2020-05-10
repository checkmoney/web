import React, { useMemo } from 'react';
import { useMappedState } from 'redux-react-hook';

import { useTranslation } from '&front/domain/i18n';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { Tab, Tabs } from '&front/ui/components/layout/tabs';
import { useEnvironment } from '&front/ui/hooks/useEnvironment';
import { useWindowSize } from '&front/ui/hooks/useWindowSize';

import { pushRoute } from '../routing';
import { TransactionList } from './components/transaction-list';
import { createMonths } from './helpers/createMonths';
import * as styles from './History.css';

export const History = () => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate);
  const { isClient } = useEnvironment();
  const { t } = useTranslation();

  const months = useMemo(
    () => createMonths(t, firstTransactionDate, new Date()),
    [firstTransactionDate, t],
  );
  const defaultMonthTitle = useMemo(() => translatedMonthTitle(t, new Date()), [
    t,
  ]);

  const { innerWidth } = useWindowSize();
  const isMobile = innerWidth && innerWidth < 768;

  return (
    <Container>
      <PageHeader title="История" onBack={() => pushRoute('/app')} />

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
