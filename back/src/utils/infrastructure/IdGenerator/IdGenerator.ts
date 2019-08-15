export abstract class IdGenerator {
  public abstract getId(): Promise<string>;
}
