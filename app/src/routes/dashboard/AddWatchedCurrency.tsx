import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { theme } from "../../theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.surface.main,
    borderRadius: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: theme.palette.text.main,
    fontWeight: "bold",
    padding: "0 14px",
  },
  iconContainer: {
    borderRadius: 14,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
  },
  disabled: {
    cursor: "unset",
    pointerEvents: "none",
    filter: "grayscale(1)",
  },
  icon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: "1em",
  },
});

interface AddWatchedCurrencyProps {
  onClick: () => void;
  disabled?: boolean;
}

export function AddWatchedCurrency({
  onClick,
  disabled,
}: AddWatchedCurrencyProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.text}>Watched Currencies</p>
      <motion.button
        className={clsx(classes.iconContainer, {
          [classes.disabled]: disabled,
        })}
        initial={{
          backgroundColor: theme.palette.primary.main,
        }}
        whileHover={{
          backgroundColor: theme.palette.secondary.main,
        }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
      >
        <motion.span
          whileHover={{
            scale: 1.1,
          }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.95 }}
          className={classes.icon}
        >
          <Add className={classes.addIcon} />
        </motion.span>
      </motion.button>
    </div>
  );
}
