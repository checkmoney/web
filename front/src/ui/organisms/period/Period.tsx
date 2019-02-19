import { Label } from '@front/ui/atoms/label'
import { DatePicker } from '@front/ui/molecules/date-picker'

interface Props {
  start: Date
  updateStart: (newStart: Date) => void
  end: Date
  updateEnd: (newEnd: Date) => void
}

const createHandle = (update: (d: Date) => void) => (date?: Date) =>
  update(date ? new Date(date) : new Date())

export const Period = ({ start, end, updateStart, updateEnd }: Props) => {
  return (
    <>
      <Label text="Start" inline>
        <DatePicker value={start} onChange={createHandle(updateStart)} />
      </Label>

      <Label text="End" inline>
        <DatePicker value={end} onChange={createHandle(updateEnd)} />
      </Label>
    </>
  )
}
