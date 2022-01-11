import { useCallback, useEffect, useState } from "react"
import { CoinMarketData, CoinMarketDataParams, Id } from "src/services/types"
import { CoinGecko } from "../services/CoinGeckoService"
import { ResponseTypes } from "../services/FetchService"

function useGet<
  D extends ResponseTypes = ResponseTypes,
  V extends Partial<Record<string, string>> = Partial<Record<string, string>>
>(_params: V, fetchData: (p: V) => Promise<D | undefined>) {
  const [data, setData] = useState<D>()
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState<V>(_params)

  useEffect(() => {
    setParams(_params)
  }, [JSON.stringify(_params)])

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _data = await fetchData(params)
      if (_data) {
        setData(_data)
      }
      setLoading(false)
    }
    getData()
  }, [JSON.stringify(params)])

  return { data, loading, setParams }
}

export function useCoinMarketData({
  id,
  ..._params
}: CoinMarketDataParams & { id: string }) {
  const { data, loading, setParams } = useGet<
    Id<CoinMarketData>,
    Id<CoinMarketDataParams>
  >(
    _params,
    useCallback((p) => CoinGecko.getCoinMarketData(id, p), [id])
  )

  return { data, loading, setParams }
}
