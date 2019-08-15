export class InvalidDefaultCurrencyException extends Error {
  public constructor(public readonly defaultCurrency: string) {
    super('Invalid default currency');
  }
}
