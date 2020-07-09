import { ComponentType } from 'react';

import { TipAction, TipModel } from '&front/application/tips';

import { DailyBudget } from './daily-budget';
import { ExtraSpending } from './extra-spending';
import { MergeCategories } from './merge-categories';
import { MergeSources } from './merge-sources';
import { PastDaysBudget } from './past-days-budget';
import { RecurrentPayment } from './recurrent-payment';

interface Props {
  tip: TipModel;
}

export const getTipComponent = (tip: TipModel): ComponentType<Props> =>
  ({
    [TipAction.MergeSources]: MergeSources,
    [TipAction.MergeCategories]: MergeCategories,
    [TipAction.DailyBudget]: DailyBudget,
    [TipAction.ExtraSpending]: ExtraSpending,
    [TipAction.Custom]: () => null, // Custom tips support has been dropped
    [TipAction.RecurrentPayment]: RecurrentPayment,
    [TipAction.PastDaysBudget]: PastDaysBudget,
  }[tip.action]);
