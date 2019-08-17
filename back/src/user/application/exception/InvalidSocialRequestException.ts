export class InvalidSocialRequestException extends Error {
  public constructor(
    public readonly login: string,
    public readonly social: string,
    public readonly payload: any,
  ) {
    super(`Invalid credentials for ${login} from ${social}`);
  }
}
