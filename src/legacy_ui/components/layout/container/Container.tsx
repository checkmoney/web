import cx from 'classnames';
import React, { ReactNode } from 'react';

import * as styles from './Container.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => (
  <div className={cx(styles.container, className)}>{children}</div>
);
