import { AcceptableValuesValidationPipe } from './AcceptableValuesValidationPipe';

export const createEnumValidationPipe = (e: object) =>
  new AcceptableValuesValidationPipe(Object.values(e));
