import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import React from "react";
import { CoinList } from "src/services/types";
import { theme } from "../../theme";

const useStyles = makeStyles({
  li: {
    padding: "7px 14px",
    boxShadow: `0px -1px 0px ${theme.surface.main} inset`,
    color: theme.palette.text.dark,
    cursor: "pointer",
    backgroundColor: theme.surface.light,
  },
});

interface CryptoSearchResultProps {
  item: CoinList;
  onClick: (id: CoinList) => void;
}

export function CryptoSearchResult({ item, onClick }: CryptoSearchResultProps) {
  const classes = useStyles();

  return (
    <motion.div
      className={classes.li}
      whileHover={{ backgroundColor: theme.surface.main }}
      transition={{ ease: "linear", duration: 0.05 }}
      onClick={() => onClick(item)}
    >
      {item.name} ({item.symbol.toUpperCase()})
    </motion.div>
  );
}
