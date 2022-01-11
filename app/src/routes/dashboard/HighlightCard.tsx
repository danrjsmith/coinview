import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import React, { useMemo } from "react"
import { FetchBoundary } from "../../designsystem/FetchBoundary"
import { LoadingEllipsis } from "../../designsystem/LoadingEllipsis"
import { useCoinMarketData } from "../../hooks/useCoinMarketData"
import {
  CoinList,
  CoinMarketDataParams,
  CoinsMarkets,
} from "../../services/types"
import { theme } from "../../theme"
import { LinePlot } from "./LinePlot"
import { PercentageChange } from "./PercentageChange"
import { Period } from "./PeriodChips"

const useStyles = makeStyles({
  root: {
    width: 210,
    height: 140,
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
    display: "grid",
    gridTemplateRows: 91,
    boxShadow: "0px 5px 15px 0 #5a76e74d",
  },
  backgroundTop: {
    background: `linear-gradient(315deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    top: 0,
    height: 91,
    width: "100%",
    position: "absolute",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 2,
  },
  backgroundBottom: {
    background: `linear-gradient(315deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
    top: 71,
    height: 69,
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  plot: {
    paddingTop: 5,
    zIndex: 3,
    height: 91,
  },
  loading: {
    height: 125,
    display: "grid",
    paddingTop: 16,
  },
  bottom: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 70px)",
    alignItems: "center",
    marginTop: -2,
    textTransform: "uppercase",
    color: theme.surface.light,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    maxWidth: 70,
  },
  largeFont: {
    fontSize: 22,
  },
})

const timePeriodMap: Record<Period, CoinMarketDataParams["days"]> = {
  "1d": "1",
  "30d": "30",
  "7d": "7",
}

const intervalMap: Record<Period, CoinMarketDataParams["interval"]> = {
  "1d": "minutely",
  "7d": "hourly",
  "30d": "daily",
}

const periodMarketDataKeyMap: Record<Period, keyof CoinsMarkets> = {
  "1d": "price_change_percentage_24h_in_currency",
  "7d": "price_change_percentage_7d_in_currency",
  "30d": "price_change_percentage_30d_in_currency",
}

interface HighlightCardProps {
  item: CoinList
  marketData: CoinsMarkets | undefined
  period: Period
  vsCurrency: string
}

export function HighlightCard({
  item,
  marketData,
  period,
  vsCurrency,
}: HighlightCardProps) {
  const classes = useStyles()
  const { data, loading } = useCoinMarketData({
    id: item.id,
    days: timePeriodMap[period],
    vs_currency: vsCurrency,
    interval: intervalMap[period],
  })

  const linePlotData = useMemo(
    () => data?.prices.map((price) => ({ x: price[0], y: price[1] })),
    [loading]
  )

  const percentageChange = useMemo(() => {
    if (linePlotData) {
      const initialPrice = linePlotData[0].y
      const finalPrice = linePlotData[linePlotData?.length - 1].y
      return (100 * (finalPrice - initialPrice)) / initialPrice
    }
  }, [loading])

  const price = useMemo(() => {
    if (linePlotData) {
      return linePlotData[linePlotData?.length - 1].y
    }
  }, [loading])

  return (
    <div className={classes.root}>
      <div className={classes.plot}>
        <FetchBoundary
          loading={loading}
          skeleton={
            <div className={classes.loading}>
              <LoadingEllipsis size={25} />
            </div>
          }
        >
          <>
            {linePlotData && linePlotData.length > 0 && (
              <LinePlot data={linePlotData} />
            )}
          </>
        </FetchBoundary>
      </div>

      <div className={classes.bottom}>
        <PercentageChange
          percentageChange={
            (marketData?.[periodMarketDataKeyMap[period]] as number) ??
            percentageChange ??
            0
          }
          className={classes.center}
        />
        {/* <Skeleton animation="wave" /> */}
        <div className={clsx(classes.center, classes.largeFont)}>
          {item.symbol}
        </div>
        <div className={classes.center}>
          <span>{(marketData?.current_price ?? price)?.toFixed(3)}</span>
          <span>{vsCurrency}</span>
        </div>
      </div>
      <div className={classes.backgroundTop} />
      <div className={classes.backgroundBottom} />
    </div>
  )
}
