import cx from 'classnames';
import React, { ReactNode } from 'react';

import * as styles from './ControlHeader.css';

interface Props {
  title: string;
  children?: ReactNode;
  className?: string;
}

export const ControlHeader = ({ title, children, className }: Props) => (
  <header className={cx(styles.header, className)}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </header>
);
