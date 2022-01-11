import React from "react"
import { createContext } from "use-context-selector"
import { useCoins } from "../hooks/useCoins"
import { useSupportedVsCurrencies } from "../hooks/useSupportedVsCurrencies"
import { CoinList } from "../services/types"

interface CryptoDataContext {
  vsCurrencies: string[]
  coins: CoinList[]
}

export const cryptoDataContext = createContext<CryptoDataContext>({
  vsCurrencies: [],
  coins: [],
})

export function CryptoDataProvider({ children }: { children: JSX.Element }) {
  const currencies = useSupportedVsCurrencies()
  const coins = useCoins()

  return (
    <cryptoDataContext.Provider value={{ vsCurrencies: currencies, coins }}>
      {children}
    </cryptoDataContext.Provider>
  )
}
