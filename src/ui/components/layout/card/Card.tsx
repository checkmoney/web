import { Card as AntCard } from 'antd';
import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  title: string;
  children: ReactNode;
  extra?: ReactNode;
  actions?: ReactNode[];
}

export const Card = ({ className, title, children, extra, actions }: Props) => {
  const actualActions = actions ? actions.filter(Boolean) : undefined;

  return (
    <AntCard title={title} extra={extra} actions={actualActions}>
      <article className={className}>{children}</article>
    </AntCard>
  );
};
