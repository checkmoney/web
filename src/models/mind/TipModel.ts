import { TipAction } from '&front/models/mind/TipAction';

export interface TipModel<Meta = any> {
  token: string;
  date: Date;
  action: TipAction;
  meta: Meta;
}
