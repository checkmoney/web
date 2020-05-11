import React from 'react';

import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { TipModel } from '&shared/models/mind/TipModel';

import { DailyBudgetMeta } from './DailyBudgetMeta';

interface Props {
  tip: TipModel<DailyBudgetMeta>;
}

export const DailyBudget = ({ tip: { meta } }: Props) => {
  if (meta.amount === 0) {
    return (
      <Card title="Бюджет на день">
        Похоже, вы потратили все деньги на сегодня
      </Card>
    );
  }

  const budget = displayMoney(meta.currency)(meta.amount, { withPenny: false });

  return (
    <Card title="Бюджет на день">
      Сегодня вы можете безболезненно потратить {budget}
    </Card>
  );
};
