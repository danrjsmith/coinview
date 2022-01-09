import { makeStyles } from "@material-ui/styles";
import React from "react";
import { CoinsMarkets } from "../../services/types";
import { theme } from "../../theme";
import { PercentageChange } from "./PercentageChange";

const useStyles = makeStyles({
  currencyChangeItem: {
    position: "relative",
    "&::after": {
      content: '" "',
      display: "block",
      borderLeft: `1px solid ${theme.palette.secondary.light}`,
      position: "absolute",
      height: 6,
      right: 0,
      width: 1,
      top: "50%",
      transform: "translateY(-50%)",
    },
    display: "flex",
    fontSize: 15,
    padding: "0 10px",
  },
});

export interface TickerProps {
  items: CoinsMarkets[];
  index: number;
}

export function TickerItem({ items, index }: TickerProps) {
  const classes = useStyles();
  const item = items[index];

  return (
    <PercentageChange
      symbol={item.symbol}
      percentageChange={item.price_change_percentage_24h_in_currency ?? 0}
      className={classes.currencyChangeItem}
    />
  );
}
