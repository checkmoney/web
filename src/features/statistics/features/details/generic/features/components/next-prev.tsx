import React, { useCallback } from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';

interface Props {
  group: GroupBy;
  previousPeriodNumber: number;
  setPreviousPeriodNumber: (t: (v: number) => number) => void;
}

const prevTitles = {
  [GroupBy.Month]: 'Предыдущий месяц',
  [GroupBy.Year]: 'Предыдущий год',
  [GroupBy.Day]: 'Предыдущий день',
  [GroupBy.Week]: 'Предыдущая неделя',
};

export const Prev = ({ group, setPreviousPeriodNumber }: Props) => {
  const back = useCallback(() => setPreviousPeriodNumber((v) => v + 1), [
    setPreviousPeriodNumber,
  ]);

  return (
    <Button onClick={back} type={ButtonType.Text}>
      {prevTitles[group]}
    </Button>
  );
};

const nextTitles = {
  [GroupBy.Year]: 'Следующий год',
  [GroupBy.Month]: 'Следующий месяц',
  [GroupBy.Day]: 'Следующий день',
  [GroupBy.Week]: 'Следующая неделя',
};

export const Next = ({
  group,
  previousPeriodNumber,
  setPreviousPeriodNumber,
}: Props) => {
  const next = useCallback(() => setPreviousPeriodNumber((v) => v - 1), [
    setPreviousPeriodNumber,
  ]);

  if (previousPeriodNumber <= 0) {
    return null;
  }

  return (
    <Button onClick={next} type={ButtonType.Text}>
      {nextTitles[group]}
    </Button>
  );
};
