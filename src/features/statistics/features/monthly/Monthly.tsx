import { endOfYear, startOfYear, getYear, parse } from 'date-fns';
import React, { useState, useMemo, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Option } from 'tsoption';
import { useMedia } from 'use-media';

import { Interval } from '&front/api/types';
import { actions } from '&front/app/statistics/periods.actions';
import {
  selectPeriods,
  selectPeriodsHasError,
} from '&front/app/statistics/periods.selectors';
import { useTranslation } from '&front/domain/i18n';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { wantUTC } from '&front/helpers/wantUTC';
import { BarChart } from '&front/ui/components/chart/bar-chart';
import { ControlHeader } from '&front/ui/components/controls/control-header';
import { YearPicker } from '&front/ui/components/form/year-picker';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { displayMoney } from '&shared/helpers/displayMoney';

interface Props {
  className?: string;
  currency: Currency;
}

export const Monthly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate);
  const isSmall = useMedia({ maxWidth: 768 });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [year, setYear] = useState(getYear(new Date()));

  const [from, to] = useMemo(() => {
    const date = parse(`${year}-01-01`);

    return [wantUTC(startOfYear)(date), wantUTC(endOfYear)(date)];
  }, [year]);
  const dateRange = useMemo(() => new Interval(from, to), [from, to]);

  useEffect(() => {
    dispatch(actions.started({ dateRange, periodType: GroupBy.Month }));
  }, [dateRange]);

  const data = useMemoMappedState(selectPeriods(GroupBy.Month, dateRange), [
    dateRange,
  ]);
  const error = useMemoMappedState(
    selectPeriodsHasError(GroupBy.Month, dateRange),
    [dateRange],
  );

  const stats = Option.of(data);
  const errorState = error ? Option.of('Error') : Option.of<string>(null);

  return (
    <section className={className}>
      <ControlHeader title={t('stats:dynamics.monthly-title')}>
        <YearPicker
          min={getYear(firstTransactionDate)}
          value={year}
          onChange={d => setYear(d || getYear(new Date()))}
        />
      </ControlHeader>

      <Loader status={{ error: errorState, loading: false }}>
        {stats.nonEmpty() && stats.get().length > 0 && (
          <BarChart
            displayValue={displayMoney(currency)}
            dataSets={stats.get().map(({ period, earnings, expenses }) => ({
              name: translatedMonthTitle(t, period.start, false),
              data: {
                income: {
                  label: t('history:incomes'),
                  value: earnings,
                },
                outcome: {
                  label: t('history:outcomes'),
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
