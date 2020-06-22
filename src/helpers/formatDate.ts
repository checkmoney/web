import { format } from 'date-fns';

export const formatDate = (date: Date, template = 'DD/MM/YYYY') =>
  format(date, template);
