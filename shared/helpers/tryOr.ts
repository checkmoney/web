export const tryOr = <T>(calculate: () => T, or: T): T => {
  try {
    return calculate();
  } catch (error) {
    return or;
  }
};
