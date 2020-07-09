import React, { useCallback } from 'react';

import { mergeTypoInCategoryFx } from '&front/application/tips';
import { Button } from '&front/presentation/atoms';
import { Card } from '&front/legacy_ui/components/layout/card';

import { DismissButton } from './dismiss-button';

interface Props {
  token: string;
  variants: string[];
}

export const Merge = ({ token, variants }: Props) => {
  const createOnMerge = (mainVariant: string) => {
    const merge = {
      primary: mainVariant,
      secondary: variants.filter((varinat) => varinat !== mainVariant),
    };

    return () => mergeTypoInCategoryFx({ token, merge });
  };

  if (!Array.isArray(variants)) {
    return null;
  }

  return (
    <Card
      title="Возможная опечатка"
      extra={<DismissButton token={token} />}
      actions={variants.map((variant) => (
        <Button mod={'ghost'} key={variant} onClick={createOnMerge(variant)}>
          {variant}
        </Button>
      ))}
    >
      Мы нашли несколько транзакций, похоже в некоторых из них допущена
      опечатка. Пожалуйста, выберите правильный вариант или закройте этот совет.
    </Card>
  );
};
