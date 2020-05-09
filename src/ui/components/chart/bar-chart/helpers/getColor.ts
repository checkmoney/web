import Color from 'color';

const colors = ['#4CAF50', '#FFC107', '#673AB7', '#F44336'];

export const getColor = (index: number) =>
  Color(colors[index])
    .alpha(0.6)
    .string();
