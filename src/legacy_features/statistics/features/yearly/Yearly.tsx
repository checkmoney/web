import { endOfYear, format, startOfYear } from 'date-fns';
import React, { useMemo } from 'react';
import { useStoreMap, useGate, useStore } from 'effector-react';
import { useMedia } from 'use-media';

import { BarChart } from '&front/legacy_ui/components/chart/bar-chart';
import { ControlHeader } from '&front/legacy_ui/components/controls/control-header';
import { Loader } from '&front/legacy_ui/components/layout/loader';
import { Currency, formatMoney } from '&front/application/currency';
import { PeriodType, DateRange, wantUTC } from '&front/shared';
import {
  selectAmoutsByPeriod,
  $periods,
  PeriodsAmountGate,
} from '&front/application/statistics';
import {
  FirstTransactionDateGate,
  $transactionsMeta,
} from '&front/application/transaction';

interface Props {
  className?: string;
  currency: Currency;
}

export const Yearly = ({ className, currency }: Props) => {
  useGate(FirstTransactionDateGate);
  const { firstTransactionDate } = useStore($transactionsMeta);

  const isSmall = useMedia({ maxWidth: 768 });

  const from = useMemo(() => wantUTC(startOfYear)(firstTransactionDate), [
    firstTransactionDate,
  ]);
  const to = useMemo(() => wantUTC(endOfYear)(new Date()), []);
  const dateRange = DateRange.memoized(from, to);

  useGate(PeriodsAmountGate, { dateRange, periodType: PeriodType.Year });

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
            displayValue={(v) => formatMoney(currency)(v)}
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
