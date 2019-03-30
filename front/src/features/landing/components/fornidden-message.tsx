interface Props {
  className?: string
}

export const ForbiddenMessage = ({ className }: Props) => (
  <p className={className}>
    You try to access the internal application page. Please sign-in or sign-up
    and try again.
  </p>
)
