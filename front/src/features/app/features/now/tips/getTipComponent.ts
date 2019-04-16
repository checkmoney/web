import { ComponentType } from 'react'

import { TipModel } from '@shared/models/mind/TipModel'
import { TipAction } from '@shared/enum/TipAction'

import { MergeSources } from './merge-sources'
import { MergeCategories } from './merge-categories'
import { DailyBudget } from './daily-budget'
import { ExtraSpending } from './extra-spending'

interface Props {
  tip: TipModel
}

export const getTipComponent = (tip: TipModel): ComponentType<Props> =>
  ({
    [TipAction.MergeSources]: MergeSources,
    [TipAction.MergeCategories]: MergeCategories,
    [TipAction.DailyBudget]: DailyBudget,
    [TipAction.ExtraSpending]: ExtraSpending,
  }[tip.action])
