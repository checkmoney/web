import { TipModel } from '$shared/models/mind/TipModel'
import { MergeSourcesMeta } from './MergeSourcesMeta'
import { Merge } from '../components/merge'

interface Props {
  tip: TipModel<MergeSourcesMeta>
}

export const MergeSources = ({ tip }: Props) => {
  return <Merge token={tip.token} variants={tip.meta} />
}
