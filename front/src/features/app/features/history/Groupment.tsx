import { GroupBy } from '@shared/enum/GroupBy'

interface Props {
  groupBy: GroupBy
  updateGroupBy: (newGroupBy: GroupBy) => void
}

export const Groupment = ({ groupBy, updateGroupBy }: Props) => (
  <>
    {Object.values(GroupBy).map(value =>
      value === groupBy ? (
        <span>{value}</span>
      ) : (
        <button onClick={() => updateGroupBy(value)}>{value}</button>
      ),
    )}
  </>
)
