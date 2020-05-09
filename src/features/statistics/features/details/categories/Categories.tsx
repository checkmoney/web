import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { GroupBy } from '&shared/enum/GroupBy';

import { Detail } from '../generic';

interface Props {
  group: GroupBy;
}

export const Categories = ({ group }: Props) => {
  const { t } = useTranslation();

  return (
    <Detail
      detailType="categories"
      detailTitle={t('common:nav.categories')}
      group={group}
      dataPath="expenses"
    />
  );
};
