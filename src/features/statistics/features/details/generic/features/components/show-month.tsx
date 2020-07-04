import React from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms/button';
import { GroupBy } from '&front/enum/GroupBy';
import { Route } from '&front/application/router';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month;
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
