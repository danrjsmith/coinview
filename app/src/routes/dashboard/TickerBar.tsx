import { makeStyles } from "@material-ui/styles"
import { motion } from "framer-motion"
import React, { useCallback, useEffect, useState } from "react"
import Ticker from "react-ticker"
import { useContextSelector } from "use-context-selector"
import { userPreferenceContext } from "../../contexts/UserPreferenceProvider"
import { FetchBoundary } from "../../designsystem/FetchBoundary"
import { LoadingEllipsis } from "../../designsystem/LoadingEllipsis"
import { useCoinsMarkets } from "../../hooks/useCoinsMarkets"
import { theme } from "../../theme"
import { CurrencySelector } from "./CurrencySelector"
import { TickerItem } from "./Ticker"

const useStyles = makeStyles({
  bar: {
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: 28,
    borderRadius: 20,
    alignSelf: "flex-start",
    display: "grid",
    gridTemplateColumns: "92px auto 50px",
    overflow: "hidden",
  },
  left: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    height: "inherit",
    zIndex: 1,
  },
  right: {
    gridAutoFlow: "column",
    display: "grid",
    overflowX: "scroll",
  },
  currencyChangeItem: {
    width: 90,
  },
  currencySelector: {
    height: 28,
  },
})

const coinChangeParams: Parameters<
  ReturnType<typeof useCoinsMarkets>["fetch"]
>[0] = {
  vsCurrency: "gbp",
  first: 20,
  order: "market_cap_desc",
  priceChangePercentage: ["24h"],
}

export function TickerBar() {
  const classes = useStyles()
  const { data, fetch, loading } = useCoinsMarkets()
  const [pause, setPause] = useState(false)
  const vsCurrency = useContextSelector(
    userPreferenceContext,
    (x) => x.preferences.tickerBar.currency
  )
  const setPreferences = useContextSelector(
    userPreferenceContext,
    (x) => x.setPreferences
  )
  const setVsCurrency = useCallback(
    (_vsCurrency: string) => {
      setPreferences((value) => ({
        ...value,
        tickerBar: { currency: _vsCurrency },
      }))
    },
    [setPreferences]
  )

  useEffect(() => {
    fetch({ ...coinChangeParams, vsCurrency: vsCurrency as any })
  }, [vsCurrency])

  return (
    <div className={classes.bar}>
      <div className={classes.left}>24hr change</div>
      <motion.ul
        className={classes.right}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <FetchBoundary
          loading={loading}
          skeleton={<LoadingEllipsis size={28} />}
        >
          {data.length > 0 ? (
            <Ticker move={!pause} mode="chain">
              {({ index }) => (
                <TickerItem
                  key={`${index % data.length}-${vsCurrency}`}
                  items={data}
                  index={index % data.length}
                />
              )}
            </Ticker>
          ) : null}
        </FetchBoundary>
      </motion.ul>
      <CurrencySelector
        onSelect={setVsCurrency}
        currency={vsCurrency}
        classes={{ root: classes.currencySelector }}
      />
    </div>
  )
}
