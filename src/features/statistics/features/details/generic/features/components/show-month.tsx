import React from 'react';

import { pushRoute } from '&front/features/routing';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month;

  return showMonth ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}/month`)}
      type={ButtonType.Secondary}
    >
      Показать за месяц
    </Button>
  ) : null;
};
