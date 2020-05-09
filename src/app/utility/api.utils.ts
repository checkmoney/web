import { Transform } from 'class-transformer';

export const TransformBigInt = () =>
  Transform((value: string) => Number(value));
