import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { pushRoute } from '&front/features/routing';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowMonth = ({ group, detailType }: Props) => {
  const showMonth = !group || group !== GroupBy.Month;
  const { t } = useTranslation();

  return showMonth ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}/month`)}
      type={ButtonType.Secondary}
    >
      {t('stats:details.show-month')}
    </Button>
  ) : null;
};
