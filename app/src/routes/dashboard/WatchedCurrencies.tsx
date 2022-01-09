import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useCoinsMarkets } from "../../hooks/useCoinsMarkets";
import { CoinList, PriceChangePercentage } from "../../services/types";
import { theme } from "../../theme";
import { AddWatchedCurrency } from "./AddWatchedCurrency";
import { CryptoSearch } from "./CryptoSearch";
import { CurrencySelector } from "./CurrencySelector";
import { HighlightCard } from "./HighlightCard";
import { Period, PeriodChips } from "./PeriodChips";

const useStyles = makeStyles({
  currencyCount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  currencyCountText: {
    color: theme.palette.text.main,
    fontSize: 14,
  },
  root: {
    backgroundColor: theme.surface.light,
    borderRadius: 40,
    padding: 28,
    marginTop: 28,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
  },
  middle: {
    padding: "12px 0",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const periodPriceChangePeriodMap: Record<Period, PriceChangePercentage> = {
  "1d": "24h",
  "30d": "30d",
  "7d": "7d",
};

export function WatchedCurrencies() {
  const classes = useStyles();
  const [searchboxOpen, setSearchboxOpen] = useState(false);
  const [watchedCurrencies, setWatchedCurrencies] = useState<CoinList[]>([]);
  const [period, setPeriod] = useState<Period>("1d");
  const [vsCurrency, setVsCurrency] = useState<string>("gbp");
  const { data: marketData, fetch } = useCoinsMarkets();

  const currencies = watchedCurrencies.map((c) => c.id);

  useEffect(() => {
    fetch({
      vsCurrency: vsCurrency as any,
      ids: currencies,
      priceChangePercentage: [periodPriceChangePeriodMap[period]],
    });
  }, [currencies.join("/"), vsCurrency]);

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <AddWatchedCurrency
          disabled={(currencies?.length ?? 0) >= 3}
          onClick={() => setSearchboxOpen(true)}
        />
        <PeriodChips period={period} setPeriod={setPeriod} />
        <CryptoSearch
          open={searchboxOpen}
          onClose={() => setSearchboxOpen(false)}
          onSelect={(item) => {
            setWatchedCurrencies((prev) => [
              ...prev.filter((p) => p.id !== item.id),
              item,
            ]);
            setSearchboxOpen(false);
          }}
        />
      </div>
      <div className={clsx({ [classes.middle]: watchedCurrencies.length > 0 })}>
        {watchedCurrencies.map((item) => (
          <HighlightCard
            item={item}
            marketData={marketData.find((data) => data.id === item.id)}
            key={item.id}
            period={period}
            vsCurrency={vsCurrency}
          />
        ))}
      </div>
      <div className={classes.bottom}>
        {watchedCurrencies.length > 0 && (
          <>
            <CurrencySelector
              currency={vsCurrency}
              onSelect={(c) => setVsCurrency(c)}
            />
            <div className={classes.currencyCount}>
              <p
                className={classes.currencyCountText}
              >{`${watchedCurrencies.length}/3 currencies`}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
