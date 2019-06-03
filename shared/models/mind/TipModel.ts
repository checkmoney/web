import { TipAction } from '$shared/enum/TipAction'

export interface TipModel<Meta = any> {
  token: string
  date: Date
  action: TipAction
  meta: Meta
}
