import { format } from 'date-fns';
import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { translatedMonthTitle } from '&front/helpers/translatedMonthTitle';
import { Card } from '&front/ui/components/layout/card';
import { GroupBy } from '&shared/enum/GroupBy';

import { Next, Prev } from '../components/next-prev';
import { ShowMonth } from '../components/show-month';
import { ShowYear } from '../components/show-year';
import * as styles from './PeriodChooser.css';

interface Props {
  previousPeriodNumber: number;
  setPreviousPeriodNumber: (t: (v: number) => number) => void;
  from: Date;
  to: Date;
  group?: GroupBy;
  detailType: string;
}

export const PeriodChooser = ({
  from,
  group,
  setPreviousPeriodNumber,
  previousPeriodNumber,
  detailType,
}: Props) => {
  const { t } = useTranslation();

  const title = !group
    ? t('stats:details.all-time')
    : group === GroupBy.Year
    ? format(from, 'YYYY')
    : translatedMonthTitle(t, from);

  const actionProps = {
    setPreviousPeriodNumber,
    previousPeriodNumber,
    group,
  };

  return (
    <Card
      title={title}
      actions={[
        <Prev key="prev" {...actionProps} />,
        <Next key="next" {...actionProps} />,
      ]}
      className={styles.card}
    >
      <ShowYear group={group} detailType={detailType} />
      <ShowMonth group={group} detailType={detailType} />
    </Card>
  );
};
