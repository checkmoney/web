import React from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms/button';
import { GroupBy } from '&front/enum/GroupBy';
import { Route } from '&front/application/router';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowYear = ({ group, detailType }: Props) => {
  const showYear = !group || group !== GroupBy.Year;
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
