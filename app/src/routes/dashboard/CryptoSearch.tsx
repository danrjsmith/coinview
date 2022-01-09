import { makeStyles, Modal } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CoinList } from "src/services/types";
import { theme } from "../../theme";
import { CryptoSearchResults } from "./CryptoSearchResults";

const useStyles = makeStyles({
  modal: {
    width: 350,
    position: "absolute",
    left: "50%",
    top: 147,
    transform: "translateX(-50%)",
    boxShadow: "0 25px 80px rgb(0 0 0 / 30%)",
    "-webkit-font-smoothing": "antialiased",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    border: `2px solid ${theme.palette.secondary.light}`,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 38,
    fontSize: 16,
    color: theme.palette.text.main,
    fontFamily: "PragatiNarrow",
    fontWeight: "normal",
    padding: 14,
  },
});

interface CryptoSearchProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: CoinList) => void;
}

const inputName = "search";

export function CryptoSearch({ open, onClose, onSelect }: CryptoSearchProps) {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleSubmit, register, control, setValue } = useForm();

  const term = useWatch({ name: inputName, control });
  const inputProps = register(inputName);

  return (
    <Modal
      open={open}
      onBackdropClick={onClose}
      BackdropProps={{ invisible: true }}
      onRendered={() => {
        setValue(inputName, "");
        inputRef.current?.focus();
      }}
    >
      <div className={classes.modal}>
        <form onSubmit={handleSubmit(() => {})} autoComplete="off">
          <motion.input
            placeholder="Search for cryptocurrencies..."
            className={classes.input}
            {...inputProps}
            ref={(el) => {
              inputRef.current = el;
              inputProps.ref(el);
            }}
            animate={(term ?? "") === "" ? "empty" : "term"}
            initial={"empty"}
            transition={{ duration: 0 }}
            variants={{
              term: {
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              },
              empty: {
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              },
            }}
          />
        </form>
        <CryptoSearchResults term={term ?? ""} onSelect={onSelect} />
      </div>
    </Modal>
  );
}
