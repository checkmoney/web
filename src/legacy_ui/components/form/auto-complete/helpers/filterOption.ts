export const filterOption = (inputValue: string, option: any) => {
  if (option && option.props && option.props.children) {
    return `${option.props.children}`
      .toUpperCase()
      .includes(inputValue.toUpperCase());
  }

  return false;
};
