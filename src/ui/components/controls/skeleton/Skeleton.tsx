import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';

import './AntSkeleton.css';

interface Props {
  showTitle?: boolean;
  rows?: number;
}

export const Skeleton = ({ showTitle = false, rows = 2 }: Props) => {
  return <AntSkeleton title={showTitle} paragraph={{ rows }} />;
};
