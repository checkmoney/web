import React from 'react';
import { useRouter } from 'react-router5';

import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';
import { Route } from '&front/app/router';

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
      type={ButtonType.Secondary}
    >
      Показать за год
    </Button>
  ) : null;
};
