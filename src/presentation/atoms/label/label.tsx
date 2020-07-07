import cx from 'classnames';
import React, { ComponentType } from 'react';

import { LabelProps } from './label.types';
import * as styles from './label.css';

export const Label: ComponentType<LabelProps> = ({
  text,
  children,
  className,
}) => {
  return (
    <label className={cx(className, styles.container)}>
      <span className={styles.text}>{text}</span>
      {children}
    </label>
  );
};
