import React from 'react';

import { useTranslation } from '&front/domain/i18n';
import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { ExtraSpendingMeta } from './ExtraSpendingMeta';

interface Props {
  tip: TipModel<ExtraSpendingMeta>;
}

export const ExtraSpending = ({ tip: { token, meta } }: Props) => {
  const { t } = useTranslation();

  const overrun = displayMoney(meta.currency)(meta.difference, {
    withPenny: false,
  });

  return (
    <Card title={t('tips:extra.title')} extra={<DismissButton token={token} />}>
      {t('tips:extra.content', { overrun })}
    </Card>
  );
};
