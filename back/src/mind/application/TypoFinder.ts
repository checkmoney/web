import { Injectable } from '@nestjs/common'
import { findBestMatch } from 'string-similarity'

import { IncomeRepository } from '@back/money/domain/IncomeRepository'
import { OutcomeRepository } from '@back/money/domain/OutcomeRepository'

@Injectable()
export class TypoFinder {
  public constructor(
    private readonly incomeRepo: IncomeRepository,
    private readonly outcomeRepo: OutcomeRepository,
  ) {}

  public async findTyposInSources(userLogin: string) {
    const sources = await this.incomeRepo.findSourcesForUser(userLogin)

    return this.matches(sources)
  }

  public async findTyposInCategories(userLogin: string) {
    const categories = await this.outcomeRepo.findCategoriesForUser(userLogin)

    return this.matches(categories)
  }

  private matches(variants: string[]) {
    const TYPO_THRESHOLD = 0.8

    const pairs = variants
      .map(variant => ({
        original: variant,
        bestMatch: findBestMatch(variant, variants.filter(v => v !== variant))
          .bestMatch,
      }))
      .filter(({ bestMatch }) => !!bestMatch)
      .filter(({ bestMatch }) => bestMatch.rating > TYPO_THRESHOLD)
      .map(({ original, bestMatch }) => [original, bestMatch.target])

    // Do not rewrite this with `reduce`, please
    const sameSets: string[][] = []

    pairs.forEach(pair => {
      const exist = sameSets.find(same =>
        pair.some(suggestion => same.includes(suggestion)),
      )

      if (!exist) {
        // add new set — pair
        sameSets.push(pair)
        return
      }

      // add pait to exist set
      exist.push(...pair)
    })

    return sameSets.map(same => [...new Set(same)])
  }
}
