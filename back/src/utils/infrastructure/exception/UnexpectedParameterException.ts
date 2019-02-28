export class UnexpectedParameterException extends Error {
  public constructor(public readonly parameter: string, message: string) {
    super(message)
  }
}
