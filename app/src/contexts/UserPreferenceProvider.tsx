import React from "react"
import { CoinList } from "src/services/types"
import { createContext } from "use-context-selector"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface UserPreferences {
  tickerBar: {
    currency: string
  }
  watchedCurrencies: {
    currency: string
    currencies: CoinList[]
  }
}

const DEFAULT_PREFERENCES = {
  tickerBar: {
    currency: "gbp",
  },
  watchedCurrencies: {
    currency: "gbp",
    currencies: [],
  },
}

interface UserPreferenceContext {
  preferences: UserPreferences
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>
}

export const userPreferenceContext = createContext<UserPreferenceContext>({
  preferences: DEFAULT_PREFERENCES,
  setPreferences: () => {},
})

export function UserPreferenceProvider({
  children,
}: {
  children: JSX.Element
}) {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    "user-preferences",
    DEFAULT_PREFERENCES
  )

  return (
    <userPreferenceContext.Provider
      value={{
        preferences: preferences ?? DEFAULT_PREFERENCES,
        setPreferences,
      }}
    >
      {children}
    </userPreferenceContext.Provider>
  )
}
