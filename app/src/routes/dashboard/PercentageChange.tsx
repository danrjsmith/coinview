import { makeStyles } from "@material-ui/styles"
import clsx from "clsx"
import { motion } from "framer-motion"
import React, { useMemo } from "react"
import { theme } from "../../theme"

const useStyles = makeStyles({
  percentageChangeItem: {
    display: "flex",
    fontSize: 15,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  upArrow: {
    borderLeft: "3px solid transparent",
    borderRight: "3px solid transparent",
    borderBottom: `5px solid ${theme.palette.secondary.contrastSuccessText}`,
  },
  downArrow: {
    borderLeft: "3px solid transparent",
    borderRight: "3px solid transparent",
    borderTop: `5px solid ${theme.palette.secondary.contrastWarnText}`,
  },
  percentage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 2px",
    paddingTop: 3,
  },
  positive: {
    color: theme.palette.secondary.contrastSuccessText,
  },
  negative: {
    color: theme.palette.secondary.contrastWarnText,
  },
  percentageText: {},
  symbol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 3px",
    paddingTop: 3,
    color: theme.palette.secondary.contrastText,
  },
  symbolText: { textTransform: "uppercase" },
})

export interface PercentageChangeProps {
  percentageChange: number
  symbol?: string
  className?: string
}

export function PercentageChange({
  percentageChange,
  symbol,
  className,
}: PercentageChangeProps) {
  const classes = useStyles()
  const positive = useMemo(() => Math.sign(percentageChange) === 1, [
    percentageChange,
  ])

  return (
    <motion.li className={clsx(classes.percentageChangeItem, className)}>
      <div className={classes.icon}>
        <div
          className={clsx({
            [classes.upArrow]: positive,
            [classes.downArrow]: !positive,
          })}
        />
      </div>
      <div
        className={clsx(classes.percentage, {
          [classes.positive]: positive,
          [classes.negative]: !positive,
        })}
      >
        <p className={classes.percentageText}>{`${Number(
          Math.abs(percentageChange)
        ).toFixed(2)}%`}</p>
      </div>
      {symbol && (
        <div className={classes.symbol}>
          <p className={classes.symbolText}>{symbol}</p>
        </div>
      )}
    </motion.li>
  )
}
