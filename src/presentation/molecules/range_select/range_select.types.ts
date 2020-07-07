export interface RangeSelectProps {
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
}
