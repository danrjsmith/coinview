import React from "react"

export type Period = "1d" | "7d" | "30d"

interface PeriodChipsProps {
  period: Period
  setPeriod: (period: Period) => void
}

export function PeriodChips(props: PeriodChipsProps) {
  return <div></div>
}
