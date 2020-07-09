import React from 'react';

import { Card } from '&front/legacy_ui/components/layout/card';
import { formatMoney } from '&front/application/currency';
import { TipModel } from '&front/application/tips';

import { DismissButton } from '../components/dismiss-button';
import { ExtraSpendingMeta } from './ExtraSpendingMeta';

interface Props {
  tip: TipModel<ExtraSpendingMeta>;
}

export const ExtraSpending = ({ tip: { token, meta } }: Props) => {
  const overrun = formatMoney(meta.currency)(meta.difference);

  return (
    <Card title="Большие траты" extra={<DismissButton token={token} />}>
      Вы потратили в этом месяце на {overrun} больше, чем можете себе позволить
    </Card>
  );
};
