import React, { ReactNode } from 'react';
import { FetchingState } from 'redux-clear';

import { Skeleton } from '../../controls/skeleton/Skeleton';

interface Props {
  status: FetchingState;
  children: ReactNode;
  skeleton?: boolean;
  expectedRows?: number;
  dataAvaiable?: boolean;
}

export const Loader = ({
  status: { loading, error },
  children,
  expectedRows,
  skeleton = false,
  dataAvaiable = true,
}: Props) => {
  if (typeof error === 'boolean' && error) {
    return <p>error</p>;
  }

  if (typeof error !== 'boolean' && error.nonEmpty()) {
    return <p>error: {error.get()}</p>;
  }

  const showLoader = loading || !dataAvaiable;

  if (skeleton && showLoader) {
    return <Skeleton rows={expectedRows} />;
  }

  if (showLoader) {
    return <p>loading...</p>;
  }

  return <>{children}</>;
};
