import cx from 'classnames';
import React, { useCallback } from 'react';

import { useCustomInput } from '&front/ui/hooks/useCustomInput';

import { ButtonGroup, Button, ButtonType } from '../button';
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
      props.value === currentValue ? ButtonType.Primary : ButtonType.Secondary,
    [currentValue],
  );

  return (
    <ButtonGroup className={cx(styles.group, className)}>
      {children.map(child => (
        <Button
          onClick={() => handleChange(child.props.value)}
          type={resolveType(child.props)}
          key={child.props.value}
        >
          {child.props.children || child.props.value}
        </Button>
      ))}
    </ButtonGroup>
  );
};
