import React from "react";
import { TickerBar } from "./TickerBar";
import { WatchedCurrencies } from "./WatchedCurrencies";

export function Dashboard() {
  return (
    <>
      <TickerBar />
      <WatchedCurrencies />
    </>
  );
}
