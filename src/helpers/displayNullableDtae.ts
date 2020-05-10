import { format } from 'date-fns';
import { Option } from 'tsoption';

export const displayNullableDate = (date?: Date) =>
  Option.of(date)
    .map((d) => format(d, 'D.MM.YYYY'))
    .getOrElse('');
