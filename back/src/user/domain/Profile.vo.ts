export class Profile {
  private name?: string

  public constructor(name?: string) {
    this.name = name
  }

  public changeName(newName: string) {
    if (newName.length < 1) {
      // TODO: throw error
    }

    this.name = newName
  }

  public removeName() {
    this.name = undefined
  }
}
