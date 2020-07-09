import { format } from 'date-fns';
import React from 'react';

import { Card } from '&front/legacy_ui/components/layout/card';
import { PeriodType, getTranslatedMonthTitle } from '&front/shared';

import { Next, Prev } from '../components/next-prev';
import { ShowMonth } from '../components/show-month';
import { ShowYear } from '../components/show-year';
import * as styles from './PeriodChooser.css';

interface Props {
  previousPeriodNumber: number;
  setPreviousPeriodNumber: (t: (v: number) => number) => void;
  from: Date;
  to: Date;
  group: PeriodType;
  detailType: string;
}

export const PeriodChooser = ({
  from,
  group,
  setPreviousPeriodNumber,
  previousPeriodNumber,
  detailType,
}: Props) => {
  const title =
    group === PeriodType.Year
      ? format(from, 'YYYY')
      : getTranslatedMonthTitle(from);

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
