import { PageHeader as AntPageHeader } from 'antd';
import React from 'react';

import './AntPageHeader.css';

interface Props {
  onBack: () => void;
  title: string;
}

export const PageHeader = ({ onBack, title }: Props) => {
  return <AntPageHeader onBack={() => onBack()} title={title} />;
};
