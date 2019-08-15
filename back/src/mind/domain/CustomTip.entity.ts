import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CustomTipModel } from '&shared/models/mind/CustomTipModel';

@Entity()
export class CustomTip implements CustomTipModel {
  @PrimaryColumn()
  public readonly id: string;

  @Column()
  public readonly title: string;

  @Column()
  public readonly text: string;

  @Column()
  public readonly link?: string;

  @Column()
  public readonly expireAt: Date;

  @Column()
  public readonly important: boolean;

  public constructor(
    id: string,
    title: string,
    text: string,
    expireAt: Date,
    important: boolean = false,
    link?: string,
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.expireAt = expireAt;
    this.important = important;
    this.link = link;
  }
}
