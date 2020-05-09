import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { TipModel } from '&shared/models/mind/TipModel';

import { DailyBudgetMeta } from './DailyBudgetMeta';

interface Props {
  tip: TipModel<DailyBudgetMeta>;
}

export const DailyBudget = ({ tip: { meta } }: Props) => {
  const { t } = useTranslation();

  if (meta.amount === 0) {
    return (
      <Card title={t('tips:daily-budget.title')}>
        {t('tips:daily-budget.content.empty')}
      </Card>
    );
  }

  const budget = displayMoney(meta.currency)(meta.amount, { withPenny: false });

  return (
    <Card title={t('tips:daily-budget.title')}>
      {t('tips:daily-budget.content.full', { budget })}
    </Card>
  );
};
