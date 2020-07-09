import React, { useCallback } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'react-router5';

import { $statisticsMeta } from '&front/application/statistics';
import { Container } from '&front/legacy_ui/components/layout/container';
import { PageHeader } from '&front/legacy_ui/components/layout/page-header';
import { Tabs, Tab } from '&front/legacy_ui/components/layout/tabs';
import { PeriodType } from '&front/shared';
import { Route } from '&front/application/router';

import { Categories } from './features/categories';
import { Dynamics } from './features/dynamics';
import { Monthly } from './features/monthly';
import { Sources } from './features/sources';
import { Yearly } from './features/yearly';
import * as styles from './Statistics.css';

const columnWidthPercent = 40;
const maxLength = 5;

export const Statistics = () => {
  const { currency } = useStore($statisticsMeta);
  const { navigate } = useRouter();

  const renderContent = useCallback(
    (title: string, group: PeriodType.Month | PeriodType.Year) => (
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
          {group === PeriodType.Month && <Monthly currency={currency!} />}
          {group === PeriodType.Year && <Yearly currency={currency!} />}
        </div>
      </Tab>
    ),
    [currency],
  );

  return (
    <Container>
      <PageHeader title="Статистика" onBack={() => navigate(Route.Dashboard)} />

      <Tabs>
        {renderContent('Месяц', PeriodType.Month)}
        {renderContent('Год', PeriodType.Year)}
      </Tabs>
    </Container>
  );
};
