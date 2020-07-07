import React from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms';
import { PeriodType } from '&front/shared';
import { Route } from '&front/application/router';

interface Props {
  group?: PeriodType;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== PeriodType.Month;
  const { navigate } = useRouter();

  return showMonth ? (
    <Button
      onClick={() =>
        navigate(Route.DetailedStatistics, { type: detailType, group: 'month' })
      }
    >
      Показать за месяц
    </Button>
  ) : null;
};
