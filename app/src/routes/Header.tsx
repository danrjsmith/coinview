import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import React from "react";
import { theme } from "../theme";

const useStyles = makeStyles({
  header: {
    display: "grid",
    height: 70,
    gridTemplateColumns: "92px auto 92px",
    alignItems: "center",
    padding: 10,
  },
  leftContainer: {
    display: "flex",
  },
  logo: {
    backgroundColor: theme.palette.neutral.dark,
    width: 92,
    borderRadius: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: theme.palette.neutral.contrastText,
    fontSize: 14,
  },
  rightContainer: {
    display: "flex",
    justifySelf: "end",
  },
  login: {
    backgroundColor: theme.palette.primary.main,
    width: 92,
    borderRadius: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 18,
    color: theme.palette.text.dark,
    cursor: "pointer",
    backgroundColor: theme.surface.dark,
    padding: "0 14px",
    borderRadius: 14,
  },
});

export function Header() {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.leftContainer}>
        <div className={classes.logo}>
          <p className={classes.logoText}>CoinView</p>
        </div>
      </div>
      <div className={classes.centerContainer}>
        <motion.p
          className={classes.centerText}
          whileHover={{
            backgroundColor: theme.surface.main,
          }}
          transition={{ duration: 0.2, ease: "linear" }}
        >
          Dashboard
        </motion.p>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.login}>
          <p className={classes.logoText}>Login</p>
        </div>
      </div>
    </header>
  );
}
