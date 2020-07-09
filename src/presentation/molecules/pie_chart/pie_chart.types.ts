export interface PieChartProps<
  DS extends Record<string, string | number> = {}
> {
  data: DS[];
  nameKey: keyof DS;
  valueKey: keyof DS;
  valueToString: (item: number | string | undefined) => string;
}
