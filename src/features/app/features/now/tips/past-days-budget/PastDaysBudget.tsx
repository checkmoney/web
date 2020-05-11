import React from 'react';

import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { GroupBy } from '&shared/enum/GroupBy';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { PastDaysBudgetMeta } from './PastDaysBudgetMeta';

interface Props {
  tip: TipModel<PastDaysBudgetMeta>;
}

const titles = {
  [GroupBy.Month]: 'Прошлый месяц',
  [GroupBy.Week]: 'Прошлая неделя',
  [GroupBy.Day]: 'Вчера',
  [GroupBy.Year]: 'Прошлый год',
};
const contents = {
  [GroupBy.Month]: (amount: string) =>
    `За прошлый месяц вы потратили ${amount}`,
  [GroupBy.Week]: (amount: string) =>
    `За прошлую неделю вы потратили ${amount}`,
  [GroupBy.Day]: (amount: string) => `Вчера вы потратили ${amount}`,
  [GroupBy.Year]: (amount: string) => `За прошлй год вы потратили ${amount}`,
};

export const PastDaysBudget = ({ tip: { token, meta } }: Props) => {
  const amount = displayMoney(meta.currency)(meta.outcome, {
    withPenny: false,
  });

  return (
    <Card title={titles[meta.group]} extra={<DismissButton token={token} />}>
      {contents[meta.group](amount)}
    </Card>
  );
};
