import { makeStyles } from "@material-ui/styles";
import React, { useMemo } from "react";
import { FetchBoundary } from "../../designsystem/FetchBoundary";
import { LoadingEllipsis } from "../../designsystem/LoadingEllipsis";
import { useCoinMarketData } from "../../hooks/useCoinMarketData";
import {
  CoinList,
  CoinMarketDataParams,
  CoinsMarkets,
} from "../../services/types";
import { theme } from "../../theme";
import { LinePlot } from "./LinePlot";
import { PercentageChange } from "./PercentageChange";
import { Period } from "./PeriodChips";

const useStyles = makeStyles({
  root: {
    width: 210,
    height: 140,
    background: `linear-gradient(315deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: 20,
  },
  plot: {
    marginLeft: -15,
    paddingTop: 15,
  },
  loading: {
    height: 125,
    display: "grid",
    paddingTop: 40,
  },
  bottom: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    marginTop: -20,
    padding: "0 22px",
    textTransform: "uppercase",
    color: theme.surface.light,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const timePeriodMap: Record<Period, CoinMarketDataParams["days"]> = {
  "1d": "1",
  "30d": "30",
  "7d": "7",
};

const intervalMap: Record<Period, CoinMarketDataParams["interval"]> = {
  "1d": "minutely",
  "7d": "hourly",
  "30d": "daily",
};

const periodMarketDataKeyMap: Record<Period, keyof CoinsMarkets> = {
  "1d": "price_change_percentage_24h_in_currency",
  "7d": "price_change_percentage_7d_in_currency",
  "30d": "price_change_percentage_30d_in_currency",
};

interface HighlightCardProps {
  item: CoinList;
  marketData: CoinsMarkets | undefined;
  period: Period;
  vsCurrency: string;
}

export function HighlightCard({
  item,
  marketData,
  period,
  vsCurrency,
}: HighlightCardProps) {
  const classes = useStyles();
  const { data, loading } = useCoinMarketData({
    id: item.id,
    days: timePeriodMap[period],
    vs_currency: vsCurrency,
    interval: intervalMap[period],
  });

  const linePlotData = useMemo(
    () => data?.prices.map((price) => ({ x: price[0], y: price[1] })),
    [loading]
  );

  const percentageChange = useMemo(() => {
    if (linePlotData) {
      const initialPrice = linePlotData[0].y;
      const finalPrice = linePlotData[linePlotData?.length - 1].y;
      return (100 * (finalPrice - initialPrice)) / initialPrice;
    }
  }, [loading]);

  const price = useMemo(() => {
    if (linePlotData) {
      return linePlotData[linePlotData?.length - 1].y;
    }
  }, [loading]);

  return (
    <div className={classes.root}>
      <FetchBoundary
        loading={loading}
        skeleton={
          <div className={classes.loading}>
            <LoadingEllipsis size={25} />
          </div>
        }
      >
        <div className={classes.plot}>
          {linePlotData && linePlotData.length > 0 && (
            <LinePlot data={linePlotData} />
          )}
        </div>
      </FetchBoundary>

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
        <div className={classes.center}>{item.symbol}</div>
        <div className={classes.center}>
          {(marketData?.current_price ?? price)?.toFixed(3)}
        </div>
      </div>
    </div>
  );
}
