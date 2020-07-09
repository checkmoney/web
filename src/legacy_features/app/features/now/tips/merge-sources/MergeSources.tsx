import React from 'react';

import { TipModel } from '&front/application/tips';

import { Merge } from '../components/merge';
import { MergeSourcesMeta } from './MergeSourcesMeta';

interface Props {
  tip: TipModel<MergeSourcesMeta>;
}

export const MergeSources = ({ tip }: Props) => {
  return <Merge token={tip.token} variants={tip.meta} />;
};
