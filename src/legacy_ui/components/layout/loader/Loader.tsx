import React, { ReactNode } from 'react';

import { Skeleton } from '../../controls/skeleton/Skeleton';

interface Props {
  status: Partial<{ loading: boolean }>;
  children: ReactNode;
  skeleton?: boolean;
  expectedRows?: number;
  dataAvaiable?: boolean;
}

export const Loader = ({
  status: { loading },
  children,
  expectedRows,
  skeleton = false,
  dataAvaiable = true,
}: Props) => {
  const showLoader = loading || !dataAvaiable;

  if (skeleton && showLoader) {
    return <Skeleton rows={expectedRows} />;
  }

  if (showLoader) {
    return <p>loading...</p>;
  }

  return <>{children}</>;
};
