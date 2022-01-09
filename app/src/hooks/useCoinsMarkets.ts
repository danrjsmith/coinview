import { useState } from "react";
import { CoinGecko } from "../services/CoinGeckoService";
import { CoinsMarkets, CoinsMarketsServiceParams } from "../services/types";

interface CoinsMarketsFetchParams {
  first: number;
  vsCurrency: NonNullable<CoinsMarketsServiceParams["vsCurrency"]>;
  order: NonNullable<CoinsMarketsServiceParams["order"]>;
  priceChangePercentage: NonNullable<
    CoinsMarketsServiceParams["priceChangePercentage"]
  >;
  ids?: CoinsMarketsServiceParams["ids"];
}

interface UseCoinsMarkets {
  data: CoinsMarkets[];
  loading: boolean;
  fetch: (params: Partial<CoinsMarketsFetchParams>) => void;
  fetchNext: () => void;
  params: CoinsMarketsFetchParams;
}

export function useCoinsMarkets(): UseCoinsMarkets {
  const [data, setData] = useState<CoinsMarkets[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<CoinsMarketsFetchParams>({
    first: 50,
    order: "market_cap_desc",
    priceChangePercentage: ["1h", "24h", "7d"],
    vsCurrency: "gbp",
  });

  async function fetch({
    vsCurrency,
    priceChangePercentage,
    ids,
    order,
    first,
  }: Partial<CoinsMarketsFetchParams>) {
    setLoading(true);
    const coinsMarkets = await CoinGecko.getCoinsMarkets({
      vsCurrency: vsCurrency ?? params.vsCurrency,
      order: order ?? params.order,
      perPage: first,
      priceChangePercentage:
        priceChangePercentage ?? params.priceChangePercentage,
      ids: ids ?? [],
    });
    if (coinsMarkets) {
      setData(coinsMarkets);
      setLoading(false);
      setParams((prev) => ({
        first: first ?? prev.first,
        order: order ?? prev.order,
        priceChangePercentage:
          priceChangePercentage ?? prev.priceChangePercentage,
        vsCurrency: vsCurrency ?? prev.vsCurrency,
      }));
    }
  }

  async function fetchNext() {
    setLoading(true);
    const coinsMarkets = await CoinGecko.getCoinsMarkets({
      vsCurrency: params.vsCurrency,
      order: params.order,
      perPage: params.first,
      priceChangePercentage: params.priceChangePercentage,
      page: page + 1,
    });
    if (coinsMarkets) {
      setData((prev) => [...prev, ...coinsMarkets]);
      setLoading(false);
      setPage(page + 1);
    }
  }

  return { data, loading, fetch, fetchNext, params };
}
