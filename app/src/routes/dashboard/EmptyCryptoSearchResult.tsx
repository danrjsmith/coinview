import { makeStyles } from "@material-ui/styles"
import React from "react"
import { theme } from "../../theme"

const useStyles = makeStyles({
  li: {
    padding: "7px 14px",
    color: theme.palette.text.dark,
  },
})

export function EmptyCryptoSearchResult() {
  const classes = useStyles()

  return <div className={classes.li}>No results found</div>
}
