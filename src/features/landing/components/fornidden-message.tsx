import React from 'react';

interface Props {
  className?: string;
}

export const ForbiddenMessage = ({ className }: Props) => {
  return <p className={className}>Нужно войти или зарегистрироваться 💁‍</p>;
};
