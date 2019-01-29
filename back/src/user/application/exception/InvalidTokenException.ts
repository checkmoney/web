export class InvalidTokenException extends Error {
  public constructor(public readonly token: string) {
    super('Invalid token')
  }
}
