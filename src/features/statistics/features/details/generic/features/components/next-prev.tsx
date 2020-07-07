import React, { useCallback } from 'react';

import { Button } from '&front/presentation/atoms';
import { PeriodType } from '&front/shared';

interface Props {
  group: PeriodType;
  previousPeriodNumber: number;
  setPreviousPeriodNumber: (t: (v: number) => number) => void;
}

const prevTitles = {
  [PeriodType.Month]: 'Предыдущий месяц',
  [PeriodType.Year]: 'Предыдущий год',
  [PeriodType.Day]: 'Предыдущий день',
  [PeriodType.Week]: 'Предыдущая неделя',
};

export const Prev = ({ group, setPreviousPeriodNumber }: Props) => {
  const back = useCallback(() => setPreviousPeriodNumber((v) => v + 1), [
    setPreviousPeriodNumber,
  ]);

  return (
    <Button onClick={back} mod="ghost">
      {prevTitles[group]}
    </Button>
  );
};

const nextTitles = {
  [PeriodType.Year]: 'Следующий год',
  [PeriodType.Month]: 'Следующий месяц',
  [PeriodType.Day]: 'Следующий день',
  [PeriodType.Week]: 'Следующая неделя',
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
    <Button onClick={next} mod="ghost">
      {nextTitles[group]}
    </Button>
  );
};
