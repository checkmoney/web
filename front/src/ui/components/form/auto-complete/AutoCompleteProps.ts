export interface AutoCompleteProps {
  onChange?: (v?: string | undefined) => void
  value?: string
  variants: string[]
  placeholder?: string
}
