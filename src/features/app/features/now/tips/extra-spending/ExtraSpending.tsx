import React from 'react';

import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { ExtraSpendingMeta } from './ExtraSpendingMeta';

interface Props {
  tip: TipModel<ExtraSpendingMeta>;
}

export const ExtraSpending = ({ tip: { token, meta } }: Props) => {
  const overrun = displayMoney(meta.currency)(meta.difference, {
    withPenny: false,
  });

  return (
    <Card title="Большие траты" extra={<DismissButton token={token} />}>
      Вы потратили в этом месяце на {overrun} больше, чем можете себе позволить
    </Card>
  );
};
