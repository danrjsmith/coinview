import { makeStyles } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles({
  skeleton: {
    animationDuration: "5s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationName: "$placeHolderShimmer",
    animationTimingFunction: "linear",
    background:
      "linear-gradient(to right, #ffffff7d 8%, #ffffff 18%, #ffffff7d 33%)",
    backgroundSize: "300px 100px",
    position: "relative",
    borderRadius: 4,
    opacity: 0.7,
    animationDelay: "-0.25s",
  },
  "@keyframes placeHolderShimmer": {
    "0%": {
      backgroundPosition: "-800px 0",
    },
    "100%": {
      backgroundPosition: "800px 0",
    },
  },
})

interface SkeletonProps {
  height: number
}

export function Skeleton({ height }: SkeletonProps) {
  const classes = useStyles()

  return <div className={classes.skeleton} style={{ height }} />
}
