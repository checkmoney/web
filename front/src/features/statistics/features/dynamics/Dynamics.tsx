import {
  format,
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfMonth,
} from 'date-fns';
import { head } from 'lodash';
import React, { useMemo } from 'react';
import { useMappedState } from 'redux-react-hook';
import { Option } from 'tsoption';

import { useTranslation } from '&front/domain/i18n';
import { fetchStatsAverage } from '&front/domain/money/actions/fetchStatsAverage';
import { fetchStatsDynamics } from '&front/domain/money/actions/fetchStatsDynamics';
import { getStatsAverageFetchingStatus } from '&front/domain/money/selectors/getStatsAverageFetchingStatus';
import { getStatsDynamics } from '&front/domain/money/selectors/getStatsDynamics';
import { getStatsDynamicsFetchingStatus } from '&front/domain/money/selectors/getStatsDynamicsFetchingStatus';
import { getStatsTotalAverage } from '&front/domain/money/selectors/getStatsTotalAverage';
import { useMemoState } from '&front/domain/store';
import { mergeFetchingState } from '&front/helpers/mergeFetchingState';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { wantUTC } from '&front/helpers/wantUTC';
import { Stat } from '&front/ui/components/chart/stat';
import { Card } from '&front/ui/components/layout/card';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { calculateGroupProgress } from '&shared/helpers/calculateGroupProgress';

import * as styles from './Dynamics.css';
import { calculateGrowPercentage } from './helpers/calculateGrowPercentage';

interface Props {
  className?: string;
  group: GroupBy.Month | GroupBy.Year;
  currency: Currency;
}

// TODO: refactor it please
export const Dynamics = ({ className, group, currency }: Props) => {
  const { t } = useTranslation();

  const period =
    group === GroupBy.Month
      ? translatedMonthTitle(t, new Date())
      : format(new Date(), 'YYYY');

  const [from, to] = useMemo(() => {
    const start = group === GroupBy.Month ? startOfMonth : startOfYear;
    const end = group === GroupBy.Month ? endOfMonth : endOfYear;

    return [wantUTC(start)(new Date()), wantUTC(end)(new Date())];
  }, [group]);

  const fetchingAvergae = useMappedState(getStatsAverageFetchingStatus);
  const fetchingNow = useMappedState(getStatsDynamicsFetchingStatus);

  const fetching = mergeFetchingState(fetchingAvergae, fetchingNow);

  const averages = useMemoState(
    () => getStatsTotalAverage(currency, group),
    () => fetchStatsAverage(currency, group),
    [currency, group],
  );

  const nowStats = useMemoState(
    () => getStatsDynamics(from, to, group, currency),
    () => fetchStatsDynamics(from, to, group, currency),
    [from, to, group, currency],
  );

  const progressRate = calculateGroupProgress(group);

  const relevantNow = useMemo(
    () =>
      nowStats
        .flatMap(s => Option.of(head(s)))
        .map(s => ({
          income: s.income / progressRate,
          outcome: s.outcome / progressRate,
        })),
    [progressRate, nowStats],
  );

  const incomeGrow = calculateGrowPercentage(
    relevantNow.map(_ => _.income),
    averages.map(_ => _.income),
  );

  const outcomeGrow = calculateGrowPercentage(
    relevantNow.map(_ => _.outcome),
    averages.map(_ => _.outcome),
  );

  // TODO: add info about calculation in tooltip
  return (
    <Card title={period} className={className}>
      <p>{t(`stats:dynamics.compared-${group}`)}</p>

      <Loader skeleton expectedRows={2} status={fetching}>
        <div className={styles.diff}>
          <Stat title={t('history:incomes')} value={incomeGrow} suffix="%" />
          <Stat
            title={t('history:outcomes')}
            value={outcomeGrow}
            suffix="%"
            decreaseIsGood
          />
        </div>
      </Loader>
    </Card>
  );
};
