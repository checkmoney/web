import { Namespace } from './Namespace'
import { I18nProps } from './I18nProps'
import { Instance } from './Instance'
import { ReactNode } from 'react'
import { I18nContext } from './I18nContext'

interface ChildrenProps {
  children: ReactNode
}

const RawProvider = ({ children, ...i18nProps }: ChildrenProps & I18nProps) => {
  return (
    <I18nContext.Provider value={i18nProps}>{children}</I18nContext.Provider>
  )
}

interface ProviderProps {
  namespaces: Namespace[] | Namespace
}

export const I18nProvider = ({
  children,
  namespaces,
}: ChildrenProps & ProviderProps) => {
  const Component = Instance.withNamespaces(namespaces)(RawProvider)

  return <Component>{children}</Component>
}
