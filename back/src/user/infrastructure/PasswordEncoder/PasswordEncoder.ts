export abstract class PasswordEncoder {
  public abstract encodePassword(raw: string, salt?: string): Promise<string>
  public abstract isPasswordValid(
    encoded: string,
    raw: string,
    salt?: string,
  ): Promise<boolean>
}
