import { endOfYear, startOfYear, getYear, parse } from 'date-fns';
import React, { useState, useMemo } from 'react';
import { useStoreMap, useGate, useStore } from 'effector-react';
import { useMedia } from 'use-media';

import {
  selectAmoutsByPeriod,
  $periods,
  PeriodsAmountGate,
} from '&front/application/statistics';
import { BarChart } from '&front/legacy_ui/components/chart/bar-chart';
import { ControlHeader } from '&front/legacy_ui/components/controls/control-header';
import { Loader } from '&front/legacy_ui/components/layout/loader';
import { Currency, formatMoney } from '&front/application/currency';
import {
  PeriodType,
  DateRange,
  wantUTC,
  getTranslatedMonthTitle,
} from '&front/shared';
import { RangeSelect } from '&front/presentation/molecules';
import {
  FirstTransactionDateGate,
  $transactionsMeta,
} from '&front/application/transaction';

interface Props {
  className?: string;
  currency: Currency;
}

export const Monthly = ({ className, currency }: Props) => {
  useGate(FirstTransactionDateGate);
  const { firstTransactionDate } = useStore($transactionsMeta);

  const isSmall = useMedia({ maxWidth: 768 });

  const [year, setYear] = useState(getYear(new Date()));

  const [from, to] = useMemo(() => {
    const date = parse(`${year}-01-01`);

    return [wantUTC(startOfYear)(date), wantUTC(endOfYear)(date)];
  }, [year]);
  const dateRange = DateRange.memoized(from, to);

  useGate(PeriodsAmountGate, { dateRange, periodType: PeriodType.Month });

  const data = useStoreMap({
    store: $periods,
    keys: [PeriodType.Month, dateRange],
    fn: selectAmoutsByPeriod,
  });

  return (
    <section className={className}>
      <ControlHeader title="По месяцам в">
        <RangeSelect
          min={getYear(firstTransactionDate)}
          max={getYear(new Date())}
          value={year}
          onChange={setYear}
        />
      </ControlHeader>

      <Loader status={{ loading: false }}>
        {data.length > 0 && (
          <BarChart
            displayValue={formatMoney(currency)}
            dataSets={data.map(({ period, earnings, expenses }) => ({
              name: getTranslatedMonthTitle(period.start, false),
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
