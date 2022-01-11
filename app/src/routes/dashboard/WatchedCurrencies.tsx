import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useContextSelector } from "use-context-selector"
import { userPreferenceContext } from "../../contexts/UserPreferenceProvider"
import { useCoinsMarkets } from "../../hooks/useCoinsMarkets"
import { PriceChangePercentage } from "../../services/types"
import { theme } from "../../theme"
import { AddWatchedCurrency } from "./AddWatchedCurrency"
import { CryptoSearch } from "./CryptoSearch"
import { CurrencySelector } from "./CurrencySelector"
import { HighlightCard } from "./HighlightCard"
import { Period, PeriodChips } from "./PeriodChips"

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
})

const periodPriceChangePeriodMap: Record<Period, PriceChangePercentage> = {
  "1d": "24h",
  "30d": "30d",
  "7d": "7d",
}

export function WatchedCurrencies() {
  const classes = useStyles()
  const [searchboxOpen, setSearchboxOpen] = useState(false)
  const watchedCurrenciesPreferences = useContextSelector(
    userPreferenceContext,
    (x) => x.preferences.watchedCurrencies
  )
  const setPreferences = useContextSelector(
    userPreferenceContext,
    (x) => x.setPreferences
  )
  const watchedCurrencies = watchedCurrenciesPreferences.currencies
  const [period, setPeriod] = useState<Period>("1d")
  const vsCurrency = watchedCurrenciesPreferences.currency
  const { data: marketData, fetch } = useCoinsMarkets()

  const currencies = watchedCurrencies.map((c) => c.id)

  useEffect(() => {
    fetch({
      vsCurrency: vsCurrency as any,
      ids: currencies,
      priceChangePercentage: [periodPriceChangePeriodMap[period]],
    })
  }, [currencies.join("/"), vsCurrency])

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
            setPreferences((prev) => ({
              ...prev,
              watchedCurrencies: {
                ...prev.watchedCurrencies,
                currencies: [
                  ...prev.watchedCurrencies.currencies.filter(
                    (p) => p.id !== item.id
                  ),
                  item,
                ],
              },
            }))
            setSearchboxOpen(false)
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
              onSelect={(c) =>
                setPreferences((p) => ({
                  ...p,
                  watchedCurrencies: { ...p.watchedCurrencies, currency: c },
                }))
              }
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
  )
}
