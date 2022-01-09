export type Id<P> = {
  [K in keyof P]: P[K];
};

export type PriceChangePercentage =
  | "1h"
  | "24h"
  | "7d"
  | "14d"
  | "30d"
  | "200d"
  | "1y";

type VsCurrency = "usd" | "eur" | "gbp";

type Order =
  | "market_cap_desc"
  | "gecko_desc"
  | "gecko_asc"
  | "market_cap_asc"
  | "market_cap_desc"
  | "volume_asc"
  | "volume_desc"
  | "id_asc"
  | "id_desc";

export interface CoinsMarketsServiceParams {
  vsCurrency: VsCurrency;
  ids?: string[];
  order: Order;
  perPage?: number;
  page?: number;
  priceChangePercentage?: PriceChangePercentage[];
}

export interface CoinsMarketsParams {
  vs_currency: string;
  ids?: string;
  order?: string;
  per_page?: string;
  page?: string;
  price_change_percentage?: string;
}

export interface CoinsMarkets {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  price_change_percentage_14d_in_currency?: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
  price_change_percentage_200d_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
}

export type SupportedVsCurrencies = string[];

export interface CoinList {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinMarketData {
  prices: Array<[timeSinceEpoch: number, price: number]>;
}

export interface CoinMarketDataParams {
  vs_currency: string;
  days: '1' | '7' | '30'
  interval?: 'minutely' | 'hourly' | 'daily'
}