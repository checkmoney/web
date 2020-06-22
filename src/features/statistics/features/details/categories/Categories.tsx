import React from 'react';

import { GroupBy } from '&front/enum/GroupBy';

import { Detail } from '../generic';

interface Props {
  group: GroupBy;
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
