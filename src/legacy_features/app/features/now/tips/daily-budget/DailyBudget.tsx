import React from 'react';

import { Card } from '&front/legacy_ui/components/layout/card';
import { TipModel } from '&front/application/tips';
import { formatMoney } from '&front/application/currency';

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

  const budget = formatMoney(meta.currency)(meta.amount);

  return (
    <Card title="Бюджет на день">
      Сегодня вы можете безболезненно потратить {budget}
    </Card>
  );
};
