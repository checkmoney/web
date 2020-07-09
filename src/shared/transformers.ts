import { Transform } from 'class-transformer';

const TransformBigInt = () => Transform((value: string) => Number(value));

export { TransformBigInt };
