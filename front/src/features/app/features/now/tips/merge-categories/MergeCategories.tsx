import { TipModel } from '@shared/models/mind/TipModel'

import { MergeCategoriesMeta } from './MergeCategoriesMeta'
import { Merge } from '../components/merge'

interface Props {
  tip: TipModel<MergeCategoriesMeta>
}

export const MergeCategories = ({ tip }: Props) => {
  return <Merge target="categories" token={tip.token} variants={tip.meta} />
}
