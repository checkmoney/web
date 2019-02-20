import { OptionProps } from 'antd/lib/select'
// it's correct, use antd OptionProps

export const filterOption = (
  inputValue: string,
  option: React.ReactElement<OptionProps>,
) =>
  (option.props.children as string)
    .toLowerCase()
    .includes(inputValue.toLowerCase()) ||
  (option.props.value as string)
    .toLowerCase()
    .includes(inputValue.toLowerCase())
