import { Option } from 'tsoption'
import { Column } from 'typeorm'

export class Profile {
  public get name(): Option<string> {
    return Option.of(this._name)
  }

  @Column({ nullable: true })
  private _name?: string

  public constructor(name?: string) {
    this._name = name
  }

  public changeName(newName: string): void {
    if (newName.length < 1) {
      return this.removeName()
    }

    this._name = newName
  }

  public removeName(): void {
    this._name = undefined
  }
}
