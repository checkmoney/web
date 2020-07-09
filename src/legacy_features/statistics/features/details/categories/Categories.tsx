import React from 'react';

import { PeriodType } from '&front/shared';

import { Detail } from '../generic';

interface Props {
  group: PeriodType;
}

export const Categories = ({ group }: Props) => {
  return (
    <Detail
      detailType="categories"
      detailTitle="Категории трат"
      group={group}
      dataPath="expenses"
    />
  );
};
