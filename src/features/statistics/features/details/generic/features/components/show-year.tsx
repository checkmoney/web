import React from 'react';

import { pushRoute } from '&front/features/routing';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowYear = ({ group, detailType }: Props) => {
  const showYear = !group || group !== GroupBy.Year;

  return showYear ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}/year`)}
      type={ButtonType.Secondary}
    >
      Показать за год
    </Button>
  ) : null;
};
