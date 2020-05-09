import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { PastDaysBudgetMeta } from './PastDaysBudgetMeta';

interface Props {
  tip: TipModel<PastDaysBudgetMeta>;
}

export const PastDaysBudget = ({ tip: { token, meta } }: Props) => {
  const { t } = useTranslation();

  const amount = displayMoney(meta.currency)(meta.outcome, {
    withPenny: false,
  });

  return (
    <Card
      title={t(`tips:past-days.title-${meta.group}`)}
      extra={<DismissButton token={token} />}
    >
      {t(`tips:past-days.content-${meta.group}`, { amount })}
    </Card>
  );
};
