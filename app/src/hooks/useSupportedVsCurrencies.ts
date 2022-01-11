import { useEffect, useState } from "react"
import { CoinGecko } from "../services/CoinGeckoService"

export function useSupportedVsCurrencies() {
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([])

  useEffect(() => {
    async function getSupportedCurrencies() {
      const currencies = await CoinGecko.getSupportedVsCurrencies()
      if (currencies) {
        setSupportedCurrencies(currencies)
      }
    }
    getSupportedCurrencies()
  }, [])

  return supportedCurrencies
}
