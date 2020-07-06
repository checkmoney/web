import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { useStoreMap, useStore } from 'effector-react';
import { useRouter } from 'react-router5';
import { Option } from 'tsoption';
import useMedia from 'use-media';

import { PieChart } from '&front/ui/components/chart/pie-chart';
import { Container } from '&front/ui/components/layout/container';
import { Loader } from '&front/ui/components/layout/loader';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { PeriodType, DateRange } from '&front/shared';
import { displayMoney } from '&front/helpers/displayMoney';
import { Route } from '&front/application/router';
import { NON_BREAKING_SPACE } from '&front/helpers/NON_BREAKING_SPACE';
import {
  fetchPeriodAmountsFx,
  $periods,
  selectTotalAmountByPeriod,
  fetchCategoriesFx,
  selectCategoriesByPeriod,
  $categories,
  $statisticsMeta,
} from '&front/application/statistics';

import * as styles from './Detail.css';
import { PeriodChooser } from './features/period-chooser';

interface Props {
  group: PeriodType;
  detailType: string;
  detailTitle: string;
  dataPath: 'expenses' | 'earnings';
}

export const Detail = ({ group, detailType, detailTitle, dataPath }: Props) => {
  const { currency } = useStore($statisticsMeta);
  const isSmall = useMedia({ maxWidth: 768 });
  const { navigate } = useRouter();

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0);

  const dateRange = DateRange.createUtcPeriod(group, previousPeriodNumber);

  useEffect(() => {
    fetchCategoriesFx({ periodType: group, dateRange });
    fetchPeriodAmountsFx({ periodType: group, dateRange });
  }, [group, dateRange]);

  const data = useStoreMap({
    store: $categories,
    keys: [group, dateRange],
    fn: selectCategoriesByPeriod,
  });

  const dataByPeriod = useStoreMap({
    store: $periods,
    keys: [group, dateRange],
    fn: selectTotalAmountByPeriod,
  });
  const total = dataByPeriod[dataPath];

  const preparedData = useMemo(
    () =>
      Option.of(data).map((t) =>
        t![dataPath].map((i) => ({
          name: i.category,
          data: i.amount,
        })),
      ),
    [data, dataPath],
  );

  const errorState = Option.of<string>(null);

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
          <Loader
            status={{ error: errorState, loading: preparedData.isEmpty() }}
          >
            {preparedData.nonEmpty() && (
              <Fragment>
                {Boolean(total) && (
                  <p>
                    Всего:
                    {`${NON_BREAKING_SPACE}${displayMoney(currency!)(total, {
                      withPenny: false,
                    })}`}
                  </p>
                )}
                <PieChart
                  dataSets={preparedData.get()}
                  displayValue={(value) =>
                    displayMoney(currency!)(value, { withPenny: false })
                  }
                  fitToContainer={isSmall}
                />
              </Fragment>
            )}
          </Loader>
        </div>
      </section>
    </Container>
  );
};
