import React, { useState } from 'react';
import { useStoreMap, useStore, useGate } from 'effector-react';
import { useRouter } from 'react-router5';

import { PieChart } from '&front/presentation/molecules';
import { Container } from '&front/legacy_ui/components/layout/container';
import { Loader } from '&front/legacy_ui/components/layout/loader';
import { PageHeader } from '&front/legacy_ui/components/layout/page-header';
import { PeriodType, DateRange, NON_BREAKING_SPACE } from '&front/shared';
import { Route } from '&front/application/router';
import {
  selectCategoriesByPeriod,
  $categories,
  $statisticsMeta,
  selectTotalInPeriod,
  CategoriesGate,
  $categoriesStatus,
} from '&front/application/statistics';
import { formatMoney } from '&front/application/currency';

import * as styles from './Detail.css';
import { PeriodChooser } from './features/period-chooser';

interface Props {
  group: PeriodType;
  detailType: string;
  detailTitle: string;
  dataPath: 'expenses' | 'earnings';
}

export const Detail = ({ group, detailType, detailTitle, dataPath }: Props) => {
  const { navigate } = useRouter();

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0);

  const dateRange = DateRange.createUtcPeriod(group, previousPeriodNumber);

  useGate(CategoriesGate, { periodType: group, dateRange });

  const { currency } = useStore($statisticsMeta);

  const categories = useStoreMap({
    store: $categories,
    keys: [group, dateRange],
    fn: selectCategoriesByPeriod,
  });

  const total = useStoreMap({
    store: $categories,
    keys: [group, dateRange],
    fn: selectTotalInPeriod,
  });

  const { loading } = useStore($categoriesStatus);

  const chartData = categories?.[dataPath] || [];
  const totalData = total[dataPath];

  const formatMoneyWithCurrency = formatMoney(currency);

  return (
    <Container>
      <PageHeader
        title={detailTitle}
        onBack={() => navigate(Route.Statistics)}
      />

      <section className={styles.categories}>
        <aside className={styles.aside}>
          <PeriodChooser
            setPreviousPeriodNumber={setPreviousPeriodNumber}
            previousPeriodNumber={previousPeriodNumber}
            detailType={detailType}
            from={dateRange.start}
            to={dateRange.end}
            group={group}
          />
        </aside>

        <div className={styles.chart}>
          <Loader status={{ loading }}>
            <p>
              Всего:
              {`${NON_BREAKING_SPACE}${formatMoneyWithCurrency(totalData)}`}
            </p>
            <PieChart
              data={chartData}
              valueKey="amount"
              nameKey="category"
              valueToString={formatMoneyWithCurrency}
            />
          </Loader>
        </div>
      </section>
    </Container>
  );
};
