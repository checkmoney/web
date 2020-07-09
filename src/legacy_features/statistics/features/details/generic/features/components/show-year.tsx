import React from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms';
import { PeriodType } from '&front/shared';
import { Route } from '&front/application/router';

interface Props {
  group?: PeriodType;
  detailType: string;
}

export const ShowYear = ({ group, detailType }: Props) => {
  const showYear = !group || group !== PeriodType.Year;
  const { navigate } = useRouter();

  return showYear ? (
    <Button
      onClick={() =>
        navigate(Route.DetailedStatistics, { type: detailType, group: 'year' })
      }
      mod="default"
    >
      Показать за год
    </Button>
  ) : null;
};
