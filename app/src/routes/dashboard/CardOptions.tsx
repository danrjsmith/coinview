import { makeStyles, Popover } from "@material-ui/core"
import clsx from "clsx"
import React, { useState } from "react"
import { CoinList } from "../../services/types"
import { theme } from "../../theme"
import { CryptoSearch } from "./CryptoSearch"

const useStyles = makeStyles({
  root: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
    height: 23,
  },
  p: {
    color: theme.surface.light,
    textTransform: "uppercase",
    fontSize: 14,
    paddingLeft: 8,
    fontWeight: "bold",
  },
  downArrow: {
    borderLeft: "2px solid transparent",
    borderRight: "2px solid transparent",
    borderTop: `4px solid ${theme.surface.light}`,
    margin: 5,
    opacity: 0.7,
  },
  ul: {
    fontFamily: "PragatiNarrow",
    color: theme.palette.neutral.dark,
  },
  li: {
    padding: "0 10px",
    cursor: "pointer",
    boxShadow: `0px -1px 0px ${theme.surface.main} inset`,
    backgroundColor: theme.surface.light,
  },
})

interface CardOptionsProps {
  anchor: HTMLElement | null
  onRemove: () => void
  onReplace: (coin: CoinList) => void
  onClose: (event: React.MouseEvent<HTMLElement>) => void
  classes?: { root?: string; p?: string; ul?: string; li?: string }
}

export function CardOptions({
  anchor,
  onRemove,
  onReplace,
  onClose,
  classes: overrideClasses,
}: CardOptionsProps) {
  const classes = useStyles()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={onClose}
        onBackdropClick={onClose}
      >
        <ul className={clsx(classes.ul, overrideClasses?.ul)}>
          <li
            className={clsx(classes.li, overrideClasses?.li)}
            onClick={(e) => {
              onRemove()
              onClose(e)
            }}
          >
            Remove
          </li>
          <li
            className={clsx(classes.li, overrideClasses?.li)}
            onClick={(e) => {
              setSearchOpen(true)
              onClose(e)
            }}
          >
            Replace
          </li>
        </ul>
      </Popover>
      <CryptoSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(item) => onReplace(item)}
      />
    </>
  )
}
