import { useStoreMap, useGate } from 'effector-react';
import React from 'react';
import { format } from 'date-fns';

import {
  $grow,
  selectGrowByPeriodType,
  GrowGate,
} from '&front/application/statistics';
import { Stat } from '&front/legacy_ui/components/chart/stat';
import { Card } from '&front/legacy_ui/components/layout/card';
import { Loader } from '&front/legacy_ui/components/layout/loader';
import { PeriodType, getTranslatedMonthTitle } from '&front/shared';

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
  useGate(GrowGate, group);

  const grow = useStoreMap({
    store: $grow,
    keys: [group] as any,
    fn: selectGrowByPeriodType,
  });

  const loading = !grow;

  const period =
    group === PeriodType.Month
      ? getTranslatedMonthTitle(new Date())
      : format(new Date(), 'YYYY');

  // TODO: add info about calculation in tooltip
  return (
    <Card title={period} className={className}>
      <p>{titles[group]}</p>

      <Loader skeleton expectedRows={2} status={{ loading }}>
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
