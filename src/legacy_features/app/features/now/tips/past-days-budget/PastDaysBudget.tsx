import React from 'react';

import { Card } from '&front/legacy_ui/components/layout/card';
import { PeriodType } from '&front/shared';
import { TipModel } from '&front/application/tips';
import { formatMoney } from '&front/application/currency';

import { DismissButton } from '../components/dismiss-button';
import { PastDaysBudgetMeta } from './PastDaysBudgetMeta';

interface Props {
  tip: TipModel<PastDaysBudgetMeta>;
}

const titles = {
  [PeriodType.Month]: 'Прошлый месяц',
  [PeriodType.Week]: 'Прошлая неделя',
  [PeriodType.Day]: 'Вчера',
  [PeriodType.Year]: 'Прошлый год',
};
const contents = {
  [PeriodType.Month]: (amount: string) =>
    `За прошлый месяц вы потратили ${amount}`,
  [PeriodType.Week]: (amount: string) =>
    `За прошлую неделю вы потратили ${amount}`,
  [PeriodType.Day]: (amount: string) => `Вчера вы потратили ${amount}`,
  [PeriodType.Year]: (amount: string) => `За прошлй год вы потратили ${amount}`,
};

export const PastDaysBudget = ({ tip: { token, meta } }: Props) => {
  const amount = formatMoney(meta.currency)(meta.outcome);

  return (
    <Card title={titles[meta.group]} extra={<DismissButton token={token} />}>
      {contents[meta.group](amount)}
    </Card>
  );
};
