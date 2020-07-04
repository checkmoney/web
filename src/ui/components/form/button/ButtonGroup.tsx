import { Button } from 'antd';
import React, { ReactElement } from 'react';

import { ButtonProps } from '&front/presentation/atoms/button';

const AntButtonGroup = Button.Group;

interface Props {
  children: Array<ReactElement<ButtonProps>>;
  className?: string;
}

export const ButtonGroup = ({ children, className }: Props) => {
  return <AntButtonGroup className={className}>{children}</AntButtonGroup>;
};
