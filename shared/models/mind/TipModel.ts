import { TipAction } from '@shared/enum/TipAction'

export interface TipModel {
  date: Date
  theme: string
  action: TipAction
}
