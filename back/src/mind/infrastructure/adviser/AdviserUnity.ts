import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { flatten } from 'lodash'

import { TipModel } from '&shared/models/mind/TipModel'

import { IsAdviser } from './helpers/IsAdviser'
import { Adviser } from './helpers/Adviser'

@Injectable()
export class AdviserUnity implements Adviser {
  private advisers: Adviser[] = []

  public init(ref: ModuleRef) {
    this.advisers = Array.from(IsAdviser.handlers || new Set()).map(
      adviserClass => ref.get(adviserClass, { strict: false }),
    )
  }

  public async giveAdvice(userLogin: string): Promise<TipModel[]> {
    const advicesArray = await Promise.all(
      this.advisers.map(adviser => adviser.giveAdvice(userLogin)),
    )

    return flatten(advicesArray)
  }
}
