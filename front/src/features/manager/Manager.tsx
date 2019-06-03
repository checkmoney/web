import { Container } from '$front/ui/components/layout/container'

import { CreateTip } from './features/create-tip'

export const Manager = () => {
  return (
    <Container>
      <CreateTip />
    </Container>
  )
}
