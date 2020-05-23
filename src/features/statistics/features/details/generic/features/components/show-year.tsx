import React from 'react';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';
import { Route } from '&front/app/router/router.types';
import { useBoundRouterActions } from '&front/app/router/router.utils';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowYear = ({ group, detailType }: Props) => {
  const showYear = !group || group !== GroupBy.Year;
  const { pushRoute } = useBoundRouterActions(Route.DetailedStatistics);

  return showYear ? (
    <Button
      onClick={() => pushRoute({ type: detailType, group: 'year' })}
      type={ButtonType.Secondary}
    >
      Показать за год
    </Button>
  ) : null;
};
