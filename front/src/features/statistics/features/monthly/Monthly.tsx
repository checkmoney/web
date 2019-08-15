import { endOfYear, startOfYear, getYear, parse } from 'date-fns';
import React, { useState, useMemo } from 'react';
import { useMappedState } from 'redux-react-hook';
import { useMedia } from 'use-media';

import { useTranslation } from '&front/domain/i18n';
import { fetchStatsDynamics } from '&front/domain/money/actions/fetchStatsDynamics';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { getStatsDynamics } from '&front/domain/money/selectors/getStatsDynamics';
import { getStatsDynamicsFetchingStatus } from '&front/domain/money/selectors/getStatsDynamicsFetchingStatus';
import { useMemoState } from '&front/domain/store';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { wantUTC } from '&front/helpers/wantUTC';
import { BarChart } from '&front/ui/components/chart/bar-chart';
import { ControlHeader } from '&front/ui/components/controls/control-header';
import { YearPicker } from '&front/ui/components/form/year-picker';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { displayMoney } from '&shared/helpers/displayMoney';

const groupBy = GroupBy.Month;

interface Props {
  className?: string;
  currency: Currency;
}

export const Monthly = ({ className, currency }: Props) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate);
  const fetching = useMappedState(getStatsDynamicsFetchingStatus);
  const isSmall = useMedia({ maxWidth: 768 });
  const { t } = useTranslation();

  const [year, setYear] = useState(getYear(new Date()));

  const [from, to] = useMemo(() => {
    const date = parse(`${year}-01-01`);

    return [wantUTC(startOfYear)(date), wantUTC(endOfYear)(date)];
  }, [year]);

  const stats = useMemoState(
    () => getStatsDynamics(from, to, groupBy, currency),
    () => fetchStatsDynamics(from, to, groupBy, currency),
    [from, to, currency],
  );

  return (
    <section className={className}>
      <ControlHeader title={t('stats:dynamics.monthly-title')}>
        <YearPicker
          min={getYear(firstTransactionDate)}
          value={year}
          onChange={d => setYear(d || getYear(new Date()))}
        />
      </ControlHeader>

      <Loader status={fetching}>
        {stats.nonEmpty() && (
          <BarChart
            displayValue={displayMoney(currency)}
            dataSets={stats.get().map(({ start, income, outcome }) => ({
              name: translatedMonthTitle(t, start, false),
              data: {
                income: {
                  label: t('history:incomes'),
                  value: income,
                },
                outcome: {
                  label: t('history:outcomes'),
                  value: outcome,
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
