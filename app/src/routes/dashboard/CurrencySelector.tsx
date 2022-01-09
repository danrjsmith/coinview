import { makeStyles, Popover } from "@material-ui/core";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { useContextSelector } from "use-context-selector";
import { cryptoDataContext } from "../../contexts/CryptoDataProvider";
import { theme } from "../../theme";

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
    height: 200,
    fontFamily: "PragatiNarrow",
    color: theme.palette.neutral.dark,
  },
  li: {
    padding: "0 10px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: `0px -1px 0px ${theme.surface.main} inset`,
    backgroundColor: theme.surface.light,
  },
});

interface CurrencySelectorProps {
  currency: string;
  onSelect: (currency: string) => void;
  classes?: { root?: string; p?: string; ul?: string; li?: string };
}

export function CurrencySelector({
  currency,
  onSelect,
  classes: overrideClasses,
}: CurrencySelectorProps) {
  const currencies = useContextSelector(
    cryptoDataContext,
    (v) => v.vsCurrencies
  );
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <button
      className={clsx(classes.root, overrideClasses?.root)}
      onClick={handleClick}
    >
      <p className={clsx(classes.p, overrideClasses?.p)}>{currency}</p>
      <div className={classes.downArrow} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <ul className={clsx(classes.ul, overrideClasses?.ul)}>
          {currencies.sort().map((currency) => (
            <motion.li
              whileHover={{ backgroundColor: theme.surface.main }}
              transition={{ ease: "linear", duration: 0.05 }}
              onClick={(e) => {
                handleClose(e);
                onSelect(currency);
              }}
              className={clsx(classes.li, overrideClasses?.li)}
            >
              {currency}
            </motion.li>
          ))}
        </ul>
      </Popover>
    </button>
  );
}
