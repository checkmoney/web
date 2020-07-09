import React from 'react';

import { PeriodType } from '&front/shared';

import { Detail } from '../generic';

interface Props {
  group: PeriodType;
}

export const Sources = ({ group }: Props) => {
  return (
    <Detail
      detailType="sources"
      detailTitle="Источники дохода"
      group={group}
      dataPath="earnings"
    />
  );
};
