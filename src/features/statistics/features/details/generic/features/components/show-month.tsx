import React from 'react';
import { useRouter } from 'react-router5';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';
import { Route } from '&front/app/router';

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
      type={ButtonType.Secondary}
    >
      Показать за месяц
    </Button>
  ) : null;
};
