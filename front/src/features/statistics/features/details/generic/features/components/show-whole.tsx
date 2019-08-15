import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { pushRoute } from '&front/features/routing';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { GroupBy } from '&shared/enum/GroupBy';

interface Props {
  group?: GroupBy;
  detailType: string;
}

export const ShowWhole = ({ group, detailType }: Props) => {
  const showWhole = !!group;
  const { t } = useTranslation();

  return showWhole ? (
    <Button
      onClick={() => pushRoute(`/app/stats/${detailType}`)}
      type={ButtonType.Secondary}
    >
      {t('stats:details.show-whole')}
    </Button>
  ) : null;
};
