import { endOfYear, format, startOfYear } from 'date-fns';
import React, { useMemo, useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { useMedia } from 'use-media';
import { Option } from 'tsoption';

import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { BarChart } from '&front/ui/components/chart/bar-chart';
import { ControlHeader } from '&front/ui/components/controls/control-header';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&front/application/profile';
import { PeriodType, DateRange, wantUTC } from '&front/shared';
import { displayMoney } from '&front/helpers/displayMoney';
import { useMemoState } from '&front/domain/store';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import {
  fetchPeriodAmountsFx,
  selectAmoutsByPeriod,
  $periods,
} from '&front/application/statistics';

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

  const from = useMemo(() => wantUTC(startOfYear)(firstTransactionDate), [
    firstTransactionDate,
  ]);
  const to = useMemo(() => wantUTC(endOfYear)(new Date()), []);
  const dateRange = DateRange.memoized(from, to);

  useEffect(() => {
    fetchPeriodAmountsFx({ dateRange, periodType: PeriodType.Year });
  }, [dateRange]);

  const data = useStoreMap({
    store: $periods,
    keys: [PeriodType.Year, dateRange],
    fn: selectAmoutsByPeriod,
  });

  const errorState = Option.of<string>(null);

  return (
    <section className={className}>
      <ControlHeader title="По годам" />
      <Loader status={{ error: errorState, loading: false }}>
        {data.length > 0 && (
          <BarChart
            displayValue={(v) =>
              displayMoney(currency)(v, { withPenny: false })
            }
            dataSets={data.map(({ period, expenses, earnings }) => ({
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
