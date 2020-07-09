import { useList, useGate } from 'effector-react';
import React from 'react';
import cx from 'classnames';

import { TipsGate, $tips } from '&front/application/tips';

import * as styles from './Now.css';
import { getTipComponent } from './tips/getTipComponent';

interface Props {
  className?: string;
}

export const Now = ({ className }: Props) => {
  useGate(TipsGate);

  const components = useList($tips, (tip) => {
    const Component = getTipComponent(tip);

    return <Component tip={tip} key={tip.token} />;
  });

  return <div className={cx(styles.now, className)}>{components}</div>;
};
