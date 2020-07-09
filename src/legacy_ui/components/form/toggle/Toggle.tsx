import cx from 'classnames';
import React, { useCallback } from 'react';
import { Button as AntButton } from 'antd';

import { useCustomInput } from '&front/legacy_ui/hooks/useCustomInput';
import { Button } from '&front/presentation/atoms';

import * as styles from './Toggle.css';
import { ToggleProps } from './ToggleProps';
import { VariantProps } from './VariantProps';

export const Toggle = ({
  children,
  value,
  onChange,
  className,
}: ToggleProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  const resolveType = useCallback(
    (props: VariantProps) =>
      props.value === currentValue ? 'primary' : 'default',
    [currentValue],
  );

  return (
    <AntButton.Group className={cx(styles.group, className)}>
      {children.map((child) => (
        <Button
          onClick={() => handleChange(child.props.value)}
          mod={resolveType(child.props)}
          key={child.props.value}
        >
          {child.props.children || child.props.value}
        </Button>
      ))}
    </AntButton.Group>
  );
};
