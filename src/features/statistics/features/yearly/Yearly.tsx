import { endOfYear, format, startOfYear } from 'date-fns';
import React, { useMemo, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Option } from 'tsoption';
import { useMedia } from 'use-media';

import { Interval } from '&front/app/api/api.types';
import { actions } from '&front/app/statistics/periods.actions';
import {
  selectPeriods,
  selectPeriodsHasError,
} from '&front/app/statistics/periods.selectors';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { wantUTC } from '&front/helpers/wantUTC';
import { BarChart } from '&front/ui/components/chart/bar-chart';
import { ControlHeader } from '&front/ui/components/controls/control-header';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { displayMoney } from '&shared/helpers/displayMoney';
import { useMemoState } from '&front/domain/store';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';

interface Props {
  className?: string;
  currency: Currency;
}

export const Yearly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMemoState(
    () => getFirstTransactionDate,
    fetchFirstTransactionDate,
    [],
  );
  const isSmall = useMedia({ maxWidth: 768 });
  const dispatch = useDispatch();

  const from = useMemo(() => wantUTC(startOfYear)(firstTransactionDate), [
    firstTransactionDate,
  ]);
  const to = useMemo(() => wantUTC(endOfYear)(new Date()), []);
  const dateRange = useMemo(() => new Interval(from, to), [from, to]);

  useEffect(() => {
    dispatch(actions.started({ dateRange, periodType: GroupBy.Year }));
  }, [dateRange]);

  const data = useMemoMappedState(selectPeriods(GroupBy.Year, dateRange), [
    dateRange,
  ]);
  const error = useMemoMappedState(
    selectPeriodsHasError(GroupBy.Year, dateRange),
    [dateRange],
  );

  const stats = Option.of(data);
  const errorState = error ? Option.of('Error') : Option.of<string>(null);

  return (
    <section className={className}>
      <ControlHeader title="По годам" />
      <Loader status={{ error: errorState, loading: false }}>
        {stats.nonEmpty() && stats.get().length > 0 && (
          <BarChart
            displayValue={(v) =>
              displayMoney(currency)(v, { withPenny: false })
            }
            dataSets={stats.get().map(({ period, expenses, earnings }) => ({
              name: format(period.start, 'YYYY'),
              data: {
                income: {
                  label: 'Доходы',
                  value: earnings,
                },
                outcome: {
                  label: 'Расходы',
                  value: expenses,
                },
              },
            }))}
            fitToContainer={isSmall}
          />
        )}
      </Loader>
    </section>
  );
};
