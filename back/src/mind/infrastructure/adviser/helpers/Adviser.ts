import { TipModel } from '&shared/models/mind/TipModel';

export interface Adviser {
  giveAdvice(userLogin: string): Promise<TipModel[]>;
}
