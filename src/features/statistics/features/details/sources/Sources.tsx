import React from 'react';

import { GroupBy } from '&shared/enum/GroupBy';

import { Detail } from '../generic';

interface Props {
  group: GroupBy;
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
