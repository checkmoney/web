export const parseAmount = (rawAmount: string): number =>
  parseFloat(rawAmount.replace(/,/g, '.')) * 100;
