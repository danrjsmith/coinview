import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import React, { useMemo, useState } from "react"
import { FetchBoundary } from "../../designsystem/FetchBoundary"
import { LoadingEllipsis } from "../../designsystem/LoadingEllipsis"
import { Skeleton } from "../../designsystem/Skeleton"
import { useCoinMarketData } from "../../hooks/useCoinMarketData"
import {
  CoinList,
  CoinMarketDataParams,
  CoinsMarkets,
} from "../../services/types"
import { theme } from "../../theme"
import { CardOptions } from "./CardOptions"
import { LinePlot } from "./LinePlot"
import { PercentageChange } from "./PercentageChange"
import { Period } from "./PeriodChips"

const useStyles = makeStyles({
  root: {
    width: 210,
    height: 155,
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
    display: "grid",
    gridTemplateRows: 91,
    boxShadow: "0px 5px 15px 0 #5a76e74d",
  },
  backgroundTop: {
    backgroundColor: theme.palette.secondary.light,
    height: 34,
    top: 0,
    position: "absolute",
    width: "100%",
    opacity: 0.5,
    cursor: "pointer",
  },
  backgroundMiddle: {
    background: `linear-gradient(315deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    top: 14,
    height: 91,
    width: "100%",
    position: "absolute",
    borderRadius: 20,
    zIndex: 2,
  },
  backgroundBottom: {
    background: `linear-gradient(315deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
    top: 86,
    height: 69,
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  plot: {
    marginTop: 20,
    zIndex: 3,
    height: 91,
  },
  loading: {
    height: 125,
    display: "grid",
    paddingTop: 8,
  },
  loadingFigure: {
    width: 50,
  },
  loadingFigureSmall: {
    width: 30,
    paddingBottom: 2,
  },
  bottom: {
    display: "grid",
    gridTemplateColumns: "140px 70px",
    alignItems: "center",
    marginTop: 14,
    textTransform: "uppercase",
    color: theme.surface.light,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  lineHeight: {
    lineHeight: "14px",
  },
  largeFont: {
    fontSize: 26,
    paddingRight: 17,
    justifySelf: "flex-end",
    height: 50,
    textOverflow: "ellipsis",
    width: 70,
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  figures: {
    zIndex: 2,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  settingsIcon: {
    position: "absolute",
    top: -11,
    right: "50%",
    marginRight: -5,
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
  onRemove: () => void
  onReplace: (coin: CoinList) => void
  period: Period
  vsCurrency: string
}

export function HighlightCard({
  item,
  marketData,
  onRemove,
  onReplace,
  period,
  vsCurrency,
}: HighlightCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
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

  const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setMenuAnchor(null)
  }

  return (
    <div className={classes.root}>
      <div className={classes.settingsIcon}>...</div>
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
        <div className={classes.figures}>
          <FetchBoundary
            loading={loading}
            skeleton={
              <div className={classes.loadingFigureSmall}>
                <Skeleton height={14} />
              </div>
            }
          >
            <PercentageChange
              percentageChange={
                (marketData?.[periodMarketDataKeyMap[period]] as number) ??
                percentageChange ??
                0
              }
              className={clsx(classes.center, classes.lineHeight)}
            />
          </FetchBoundary>
          <FetchBoundary
            loading={loading}
            skeleton={
              <div className={classes.loadingFigure}>
                <Skeleton height={14} />
              </div>
            }
          >
            <div className={clsx(classes.center, classes.lineHeight)}>
              <span>{`${(marketData?.current_price ?? price)?.toFixed(
                3
              )} ${vsCurrency}`}</span>
            </div>
          </FetchBoundary>
        </div>
        <div className={clsx(classes.center, classes.largeFont)}>
          {item.symbol}
        </div>
      </div>
      <div
        className={classes.backgroundTop}
        onClick={(e) => setMenuAnchor(e.currentTarget)}
      />
      <div className={classes.backgroundMiddle} />
      <div className={classes.backgroundBottom} />
      <CardOptions
        anchor={menuAnchor}
        onClose={handleCloseMenu}
        onRemove={onRemove}
        onReplace={onReplace}
      />
    </div>
  )
}
