import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { GroupBy } from '&shared/enum/GroupBy';

import { Detail } from '../generic';

interface Props {
  group: GroupBy;
}

export const Sources = ({ group }: Props) => {
  const { t } = useTranslation();

  return (
    <Detail
      detailType="sources"
      detailTitle={t('common:nav.sources')}
      group={group}
      dataPath="earnings"
    />
  );
};
