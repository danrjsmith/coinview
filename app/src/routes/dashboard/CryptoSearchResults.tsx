import { makeStyles } from "@material-ui/styles";
import Fuse from "fuse.js";
import React, { useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import { CoinList } from "src/services/types";
import { useContextSelector } from "use-context-selector";
import { cryptoDataContext } from "../../contexts/CryptoDataProvider";
import { CryptoSearchResult } from "./CryptoSearchResult";
import { EmptyCryptoSearchResult } from "./EmptyCryptoSearchResult";

const useStyles = makeStyles({
  ul: {
    backgroundColor: "white",
    fontFamily: "PragatiNarrow",
    fontSize: 16,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

interface CryptoSearchResultsProps {
  term: string | "";
  onSelect: (id: CoinList) => void;
}

export function CryptoSearchResults({
  term,
  onSelect,
}: CryptoSearchResultsProps) {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);

  const cryptoCurrencies = useContextSelector(
    cryptoDataContext,
    (x) => x.coins
  );

  const results = useMemo(() => {
    if (term != "") {
      const fuse = new Fuse(cryptoCurrencies, {
        keys: ["name", "symbol"],
        minMatchCharLength: term.length,
        threshold: 0,
      });
      return fuse.search(term);
    }
    return [];
  }, [term]);

  const { totalSize, virtualItems } = useVirtual({
    size: results.length,
    parentRef: containerRef,
    estimateSize: useCallback(() => 38, []),
  });

  return virtualItems.length > 0 ? (
    <div
      className={classes.ul}
      style={{
        height: `${Math.min(5, results.length) * 38}px`,
        width: `100%`,
        overflow: "auto",
      }}
      ref={containerRef}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            key={results[virtualRow.index].item.id}
          >
            <CryptoSearchResult
              item={results[virtualRow.index].item}
              onClick={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  ) : term != "" ? (
    <div
      className={classes.ul}
      style={{
        height: 38,
        width: `100%`,
        overflow: "auto",
      }}
    >
      <EmptyCryptoSearchResult />
    </div>
  ) : (
    <></>
  );
}
