import React, { useState, useEffect, useContext } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import slpLogo from "../images/slp.png";
import { whiteTheme } from "../utils/customColors";
import { useStore } from "../store/index";
import { SettingsContext } from "../context/SettingsContext";

import "./Totals.css";

const Totals = ({ title, coinTotal, coinData, currency, fetched }) => {
  const [currencyTotal, setCurrencyTotal] = useState(0);
  const scholarsState = useStore((state) => state.scholars);

  useEffect(() => {
    if (fetched) {
      console.log("currency", currency);
      console.log("coinData", coinData);
      console.log("coinTotal", coinTotal);
      let _total = coinData["smooth-love-potion"][currency] * coinTotal;
      setCurrencyTotal(_total);
    }
  }, [currency, fetched, coinTotal]);

  return (
    <>
      {fetched ? (
        <div className="totals__main">
          <div className="totals__title">{fetched && title}</div>
          <div className="totals__total">
            <div className="totals__quantity">
              <img
                src={slpLogo}
                alt="slp-logo"
                width={42}
                className="totals__slpLogo"
              />
              <span>{fetched && coinTotal}</span>
              {/* <span className="totals__slp">SLP</span> */}
            </div>
          </div>
          <div className="totals__price">
            {fetched && currencyTotal.toFixed(2)}
            <span className="totals__currency">
              {fetched && currency.toUpperCase()}
            </span>
          </div>
        </div>
      ) : (
        <div className="totals__loading">
          <ThemeProvider theme={whiteTheme}>
            <CircularProgress color="secondary" />
          </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default Totals;
