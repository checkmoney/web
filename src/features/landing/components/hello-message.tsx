import React from 'react';

interface Props {
  className?: string;
}

export const HelloMessage = ({ className }: Props) => {
  return <p className={className}>Привет! 💸</p>;
};
