import { useStoreMap } from 'effector-react';
import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Option } from 'tsoption';
import useMedia from 'use-media';
import { useRouter } from 'react-router5';

import { actions as categoriesActions } from '&front/app/statistics/categories.actions';
import {
  selectCategories,
  selectCategoriesHasError,
} from '&front/app/statistics/categories.selectors';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { selectStatisticsCurrency } from '&front/app/statistics/meta.selectors';
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
} from '&front/application/statistics';

import * as styles from './Detail.css';
import { PeriodChooser } from './features/period-chooser';
import { useDateRange } from './helpers/useDateRange';

interface Props {
  group: PeriodType;
  detailType: string;
  detailTitle: string;
  dataPath: 'expenses' | 'earnings';
}

export const Detail = ({ group, detailType, detailTitle, dataPath }: Props) => {
  const currency = useSelector(selectStatisticsCurrency);
  const isSmall = useMedia({ maxWidth: 768 });
  const { navigate } = useRouter();

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0);

  const { from, to } = useDateRange(previousPeriodNumber, group);
  const dateRange = useMemo(() => new DateRange(from, to), [from, to]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesActions.started({ periodType: group, dateRange }));

    fetchPeriodAmountsFx({ periodType: group, dateRange });
  }, [group, dateRange]);

  const data = useMemoMappedState(selectCategories(group, dateRange), [
    group,
    dateRange,
  ]);

  const dataByPeriod = useStoreMap({
    store: $periods,
    keys: [group, dateRange],
    fn: selectTotalAmountByPeriod,
  });
  const total = dataByPeriod[dataPath];

  const error = useMemoMappedState(selectCategoriesHasError(group, dateRange), [
    group,
    dateRange,
  ]);

  const preparedData = useMemo(
    () =>
      Option.of(data).map((t) =>
        t[dataPath].map((i) => ({
          name: i.category,
          data: i.amount,
        })),
      ),
    [data, dataPath],
  );

  const errorState = error ? Option.of('Error') : Option.of<string>(null);

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
            from={from}
            to={to}
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
