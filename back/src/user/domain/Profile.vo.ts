import { Option } from 'tsoption'

export class Profile {
  public get name(): Option<string> {
    return Option.of(this._name)
  }

  private _name?: string

  public constructor(name?: string) {
    this._name = name
  }

  public changeName(newName: string) {
    if (newName.length < 1) {
      // TODO: throw error
    }

    this._name = newName
  }

  public removeName() {
    this._name = undefined
  }
}
