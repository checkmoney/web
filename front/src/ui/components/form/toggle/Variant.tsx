import React from 'react';

import { VariantProps } from './VariantProps';

export const Variant = ({ children, value }: VariantProps) => {
  return <>{children || value}</>;
};
