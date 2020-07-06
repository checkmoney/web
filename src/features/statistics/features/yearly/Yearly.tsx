import { endOfYear, format, startOfYear } from 'date-fns';
import React, { useMemo } from 'react';
import { useStoreMap, useGate } from 'effector-react';
import { useMedia } from 'use-media';

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
  selectAmoutsByPeriod,
  $periods,
  PeriodsAmountGate,
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

  useGate(PeriodsAmountGate, { dateRange, periodType: PeriodType.Month });

  const data = useStoreMap({
    store: $periods,
    keys: [PeriodType.Year, dateRange],
    fn: selectAmoutsByPeriod,
  });

  return (
    <section className={className}>
      <ControlHeader title="По годам" />
      <Loader status={{ loading: false }}>
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
