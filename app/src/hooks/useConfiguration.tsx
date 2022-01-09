import React, { useCallback, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

export interface Configuration {
  rounds: number
  breathCycles: number
  recoveryBreath: number
  inhale: number
  exhale: number
}

type Dispatch = (configuration: Configuration) => void

const initialConfiguration: Configuration = {
  rounds: 3,
  breathCycles: 30,
  recoveryBreath: 15,
  inhale: 2.5,
  exhale: 2.5,
}

const ConfigurationContext = createContext<[Configuration, Dispatch]>([
  initialConfiguration,
  () => null,
])

export const useConfiguration = () => {
  const configuration = useContextSelector(ConfigurationContext, (v) => v[0])
  const setConfiguration = useContextSelector(ConfigurationContext, (v) => v[1])

  return { configuration, setConfiguration }
}

export const ConfigurationProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [configuration, setConfiguration] = useState<Configuration>(
    initialConfiguration
  )

  return (
    <ConfigurationContext.Provider value={[configuration, setConfiguration]}>
      {children}
    </ConfigurationContext.Provider>
  )
}
