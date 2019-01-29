export class LoginAlreadyTakenException extends Error {
  public constructor(public readonly login: string) {
    super(`Login "${login}" already taken`)
  }
}
