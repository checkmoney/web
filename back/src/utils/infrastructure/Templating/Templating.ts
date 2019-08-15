export abstract class Templating {
  public abstract render(
    templateName: string,
    context: object,
  ): Promise<string>;
}
