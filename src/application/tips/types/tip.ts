import { Type } from 'class-transformer';

enum TipAction {
  MergeSources,
  MergeCategories,
  DailyBudget,
  ExtraSpending,
  Custom,
  RecurrentPayment,
  PastDaysBudget,
}

class TipModel<Meta = any> {
  token: string;

  @Type(() => Date)
  date: Date;

  action: TipAction;

  meta: Meta;
}

export { TipModel, TipAction };
