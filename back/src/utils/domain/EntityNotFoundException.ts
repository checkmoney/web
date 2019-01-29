export class EntityNotFoundException extends Error {
  public constructor(
    public readonly enitityName: string,
    public readonly query: object,
  ) {
    super(`${enitityName} not found by query: ${query}`)
  }
}
