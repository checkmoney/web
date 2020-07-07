export const filterOption = (inputValue: string, option: any) =>
  (option.props.children as string)
    .toLowerCase()
    .includes(inputValue.toLowerCase()) ||
  (option.props.value as string)
    .toLowerCase()
    .includes(inputValue.toLowerCase());
