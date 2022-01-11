import { makeStyles } from "@material-ui/styles"
import React from "react"

const useStyles = makeStyles({
  content: {
    display: "grid",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    gridTemplateRows: "28px auto",
    gridTemplateColumns: "1fr",
  },
})

interface ContentProps {
  children: JSX.Element | JSX.Element[]
}

export function Content({ children }: ContentProps) {
  const classes = useStyles()

  return <div className={classes.content}>{children}</div>
}
