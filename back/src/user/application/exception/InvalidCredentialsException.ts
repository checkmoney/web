export class InvalidCredentialsException extends Error {
  public constructor(
    public readonly login: string,
    public readonly password: string,
  ) {
    super('Invalid credentials')
  }
}
