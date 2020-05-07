import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Option } from 'tsoption';

import { growRequested } from '&front/app/statistics/grow.actions';
import { selectGrow } from '&front/app/statistics/grow.selectors';
import { useTranslation } from '&front/domain/i18n';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { Stat } from '&front/ui/components/chart/stat';
import { Card } from '&front/ui/components/layout/card';
import { Loader } from '&front/ui/components/layout/loader';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';

import * as styles from './Dynamics.css';

interface Props {
  className?: string;
  group: GroupBy.Month | GroupBy.Year;
  currency: Currency;
}

export const Dynamics = ({ className, group }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const grow = useMemoMappedState(selectGrow(group), [group]);

  useEffect(() => {
    dispatch(growRequested(group));
  }, [group]);

  const period =
    group === GroupBy.Month
      ? translatedMonthTitle(t, new Date())
      : format(new Date(), 'YYYY');

  // TODO: add info about calculation in tooltip
  return (
    <Card title={period} className={className}>
      <p>{t(`stats:dynamics.compared-${group}`)}</p>

      <Loader
        skeleton
        expectedRows={2}
        status={{ error: Option.of(null), loading: !Boolean(grow) }}
      >
        <div className={styles.diff}>
          <Stat
            title={t('history:incomes')}
            value={grow && grow.earnings}
            suffix="%"
          />
          <Stat
            title={t('history:outcomes')}
            value={grow && grow.expenses}
            suffix="%"
            decreaseIsGood
          />
        </div>
      </Loader>
    </Card>
  );
};
