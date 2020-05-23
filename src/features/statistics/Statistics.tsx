import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

import { selectStatisticsCurrency } from '&front/app/statistics/meta.selectors';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { Tabs, Tab } from '&front/ui/components/layout/tabs';
import { GroupBy } from '&shared/enum/GroupBy';

import { pushRoute } from '../routing';
import { Categories } from './features/categories';
import { Dynamics } from './features/dynamics';
import { Monthly } from './features/monthly';
import { Sources } from './features/sources';
import { Yearly } from './features/yearly';
import * as styles from './Statistics.css';

const columnWidthPercent = 40;
const maxLength = 5;

export const Statistics = () => {
  const currency = useMappedState(selectStatisticsCurrency);

  const renderContent = useCallback(
    (title: string, group: GroupBy.Month | GroupBy.Year) => (
      <Tab title={title} className={styles.statistics}>
        <aside className={styles.aside}>
          <Dynamics group={group} />
          <Categories
            group={group}
            currency={currency!}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
          <Sources
            group={group}
            currency={currency!}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
        </aside>

        <div className={styles.charts}>
          {group === GroupBy.Month && <Monthly currency={currency!} />}
          {group === GroupBy.Year && <Yearly currency={currency!} />}
        </div>
      </Tab>
    ),
    [currency],
  );

  return (
    <Container>
      <PageHeader title="Статистика" onBack={() => pushRoute('/app')} />

      <Tabs>
        {renderContent('Месяц', GroupBy.Month)}
        {renderContent('Год', GroupBy.Year)}
      </Tabs>
    </Container>
  );
};
