import React, { useState, useMemo, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Option } from 'tsoption';
import useMedia from 'use-media';

import { Interval } from '&front/api/types';
import { actions } from '&front/app/statistics/categories.actions';
import {
  selectCategories,
  selectCategoriesHasError,
} from '&front/app/statistics/categories.selectors';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { getDefaultCurrency } from '&front/domain/user/selectors/getDefaultCurrency';
import { pushRoute } from '&front/features/routing';
import { PieChart } from '&front/ui/components/chart/pie-chart';
import { Container } from '&front/ui/components/layout/container';
import { Loader } from '&front/ui/components/layout/loader';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { GroupBy } from '&shared/enum/GroupBy';
import { displayMoney } from '&shared/helpers/displayMoney';

import * as styles from './Detail.css';
import { PeriodChooser } from './features/period-chooser';
import { useDateRange } from './helpers/useDateRange';

interface Props {
  group: GroupBy;
  detailType: string;
  detailTitle: string;
  dataPath: 'expenses' | 'earnings';
}

export const Detail = ({ group, detailType, detailTitle, dataPath }: Props) => {
  const currency = useMappedState(getDefaultCurrency);
  const isSmall = useMedia({ maxWidth: 768 });

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0);

  const { from, to } = useDateRange(previousPeriodNumber, group);
  const dateRange = useMemo(() => new Interval(from, to), [from, to]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.started({ periodType: group, dateRange }));
  }, [group, dateRange]);

  const data = useMemoMappedState(selectCategories(group, dateRange), [
    group,
    dateRange,
  ]);
  const error = useMemoMappedState(selectCategoriesHasError(group, dateRange), [
    group,
    dateRange,
  ]);

  const preparedData = useMemo(
    () =>
      Option.of(data).map(t =>
        t[dataPath].map(i => ({
          name: i.category,
          data: i.amount,
        })),
      ),
    [data, dataPath],
  );

  const errorState = error ? Option.of('Error') : Option.of<string>(null);

  return (
    <Container>
      <PageHeader title={detailTitle} onBack={() => pushRoute('/app/stats')} />

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
              <PieChart
                dataSets={preparedData.get()}
                displayValue={value =>
                  displayMoney(currency)(value, { withPenny: false })
                }
                fitToContainer={isSmall}
              />
            )}
          </Loader>
        </div>
      </section>
    </Container>
  );
};
