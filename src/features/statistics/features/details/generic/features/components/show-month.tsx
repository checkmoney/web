import React from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';
import { useBoundRouterActions } from '&front/app/router/router.utils';
import { Route } from '&front/app/router/router.types';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month;
  const { pushRoute } = useBoundRouterActions(Route.DetailedStatistics);

  return showMonth ? (
    <Button
      onClick={() => pushRoute({ type: detailType, group: 'month' })}
      type={ButtonType.Secondary}
    >
      Показать за месяц
    </Button>
  ) : null;
};
