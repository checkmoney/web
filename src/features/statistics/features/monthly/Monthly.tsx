import { endOfYear, startOfYear, getYear, parse } from 'date-fns';
import React, { useState, useMemo, useEffect } from 'react';
import { useStoreMap } from 'effector-react';
import { useMedia } from 'use-media';
import { Option } from 'tsoption';

import {
  fetchPeriodAmountsFx,
  selectAmoutsByPeriod,
  $periods,
} from '&front/application/statistics';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { wantUTC } from '&front/helpers/wantUTC';
import { BarChart } from '&front/ui/components/chart/bar-chart';
import { ControlHeader } from '&front/ui/components/controls/control-header';
import { YearPicker } from '&front/ui/components/form/year-picker';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&front/application/profile';
import { PeriodType, DateRange } from '&front/shared';
import { displayMoney } from '&front/helpers/displayMoney';
import { useMemoState } from '&front/domain/store';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';

interface Props {
  className?: string;
  currency: Currency;
}

export const Monthly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMemoState(
    () => getFirstTransactionDate,
    fetchFirstTransactionDate,
    [],
  );
  const isSmall = useMedia({ maxWidth: 768 });

  const [year, setYear] = useState(getYear(new Date()));

  const [from, to] = useMemo(() => {
    const date = parse(`${year}-01-01`);

    return [wantUTC(startOfYear)(date), wantUTC(endOfYear)(date)];
  }, [year]);
  const dateRange = useMemo(() => new DateRange(from, to), [from, to]);

  useEffect(() => {
    fetchPeriodAmountsFx({ dateRange, periodType: PeriodType.Month });
  }, [dateRange]);

  const data = useStoreMap({
    store: $periods,
    keys: [PeriodType.Month, dateRange],
    fn: selectAmoutsByPeriod,
  });

  const errorState = Option.of<string>(null);

  return (
    <section className={className}>
      <ControlHeader title="По месяцам в">
        <YearPicker
          min={getYear(firstTransactionDate)}
          value={year}
          onChange={(d) => setYear(d || getYear(new Date()))}
        />
      </ControlHeader>

      <Loader status={{ error: errorState, loading: false }}>
        {data.length > 0 && (
          <BarChart
            displayValue={displayMoney(currency)}
            dataSets={data.map(({ period, earnings, expenses }) => ({
              name: translatedMonthTitle(period.start, false),
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
