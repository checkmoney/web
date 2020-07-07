import React from 'react';

import { TipModel } from '&front/application/tips';

import { Merge } from '../components/merge';
import { MergeCategoriesMeta } from './MergeCategoriesMeta';

interface Props {
  tip: TipModel<MergeCategoriesMeta>;
}

export const MergeCategories = ({ tip }: Props) => {
  return <Merge token={tip.token} variants={tip.meta} />;
};
