import { useStoreMap, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Option } from 'tsoption';

import {
  fetchGrowFx,
  $grow,
  selectGrowByPeriodType,
} from '&front/application/statistics';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { Stat } from '&front/ui/components/chart/stat';
import { Card } from '&front/ui/components/layout/card';
import { Loader } from '&front/ui/components/layout/loader';
import { PeriodType } from '&front/shared';

import * as styles from './Dynamics.css';

interface Props {
  className?: string;
  group: PeriodType.Month | PeriodType.Year;
}

const titles = {
  [PeriodType.Month]: 'По сравнению со средним месяцем',
  [PeriodType.Year]: 'По сравнению со средним годом',
  [PeriodType.Day]: 'По сравнению со средним днем',
  [PeriodType.Week]: 'По сравнению со средней неделей',
};

export const Dynamics = ({ className, group }: Props) => {
  const grow = useStoreMap({
    store: $grow,
    keys: [group] as any,
    fn: selectGrowByPeriodType,
  });

  const loading = useStore(fetchGrowFx.pending);

  useEffect(() => {
    fetchGrowFx(group as any);
  }, [group]);

  const period =
    group === PeriodType.Month
      ? translatedMonthTitle(new Date())
      : format(new Date(), 'YYYY');

  // TODO: add info about calculation in tooltip
  return (
    <Card title={period} className={className}>
      <p>{titles[group]}</p>

      <Loader
        skeleton
        expectedRows={2}
        status={{ error: Option.of<string>(null), loading }}
      >
        <div className={styles.diff}>
          <Stat title="Доходы" value={grow && grow.earnings} suffix="%" />
          <Stat
            title="Расходы"
            value={grow && grow.expenses}
            suffix="%"
            decreaseIsGood
          />
        </div>
      </Loader>
    </Card>
  );
};
