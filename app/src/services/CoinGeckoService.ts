import { FetchService } from "./FetchService"
import {
  CoinList,
  CoinMarketData,
  CoinMarketDataParams,
  CoinsMarkets,
  CoinsMarketsParams,
  CoinsMarketsServiceParams,
  Id,
  SupportedVsCurrencies,
} from "./types"

const coinGeckUrl = "https://api.coingecko.com/api/v3/"

class CoinGeckoService extends FetchService {
  constructor() {
    super(coinGeckUrl)
  }

  getCoinsMarkets(
    params: CoinsMarketsServiceParams
  ): Promise<CoinsMarkets[] | undefined> {
    return this.request<Id<CoinsMarkets>[], Id<CoinsMarketsParams>>({
      path: "/coins/markets",
      contentType: "application/json",
      method: "GET",
      params: {
        vs_currency: params.vsCurrency,
        ids: params.ids?.join(","),
        order: params.order,
        page: params.page?.toString(),
        per_page: params.perPage?.toString(),
        price_change_percentage: params.priceChangePercentage?.toString(),
      },
    })
  }

  getSupportedVsCurrencies() {
    return this.request<Id<SupportedVsCurrencies>>({
      path: "simple/supported_vs_currencies",
    })
  }

  getCoinList() {
    return this.request<Id<CoinList>[]>({ path: "coins/list" })
  }

  getCoinMarketData(id: string, params: CoinMarketDataParams) {
    return this.request<Id<CoinMarketData>, Id<CoinMarketDataParams>>({
      path: `coins/${id}/market_chart`,
      params,
    })
  }
}

export const CoinGecko = new CoinGeckoService()
