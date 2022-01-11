import { useEffect, useState } from "react"
import { CoinGecko } from "../services/CoinGeckoService"
import { CoinList } from "../services/types"

export function useCoins() {
  const [coins, setCoins] = useState<CoinList[]>([])

  useEffect(() => {
    async function getCoinsList() {
      const coins = await CoinGecko.getCoinList()
      if (coins) {
        setCoins(coins)
      }
    }
    getCoinsList()
  }, [])

  return coins
}
