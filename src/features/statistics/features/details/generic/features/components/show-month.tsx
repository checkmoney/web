import React from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';
import { useBoundRouter } from '&front/app/router/router.utils';
import { Route } from '&front/app/router/router.types';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month;
  const { pushRoute } = useBoundRouter(Route.DetailedStatistics);

  return showMonth ? (
    <Button
      onClick={() => pushRoute({ type: detailType, group: 'month' })}
      type={ButtonType.Secondary}
    >
      Показать за месяц
    </Button>
  ) : null;
};
