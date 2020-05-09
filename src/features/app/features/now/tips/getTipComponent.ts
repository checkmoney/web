import { ComponentType } from 'react';

import { TipAction } from '&shared/enum/TipAction';
import { TipModel } from '&shared/models/mind/TipModel';

import { Custom } from './custom';
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
    [TipAction.Custom]: Custom,
    [TipAction.RecurrentPayment]: RecurrentPayment,
    [TipAction.PastDaysBudget]: PastDaysBudget,
  }[tip.action]);
