import React, { useState, useEffect } from "react";
import axios from "axios";

import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import { useStore } from "../store/index";
import { whiteTheme } from "../utils/customColors";
import "./CoinPrice.css";

const CoinPrice = ({ coin, currency, image }) => {
  const [coinData, setCoinData] = useState({});
  const [price, setPrice] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const setSlpPrice = useStore((state) => state.setSlpPrice);

  useEffect(() => {
    getCoinPrice(coin);
  }, []);

  useEffect(() => {
    getCoinPrice(coin);
  }, [currency]);

  const getCoinPrice = async (coin) => {
    setFetched(false);
    let res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
    );
    setCoinData(res.data);
    setPrice(res.data[coin][currency]);
    setFetched(true);
    setLoading(false);

    if (coin === "smooth-love-potion") {
      setSlpPrice(res.data[coin][currency]);
    }
  };

  return (
    <Tooltip title={coin}>
      <div className="main">
        {loading && (
          <ThemeProvider theme={whiteTheme}>
            <CircularProgress style={{ marginTop: 10 }} color="secondary" />
          </ThemeProvider>
        )}
        {fetched && (
          <img src={image} alt="logo" height="20" className="coinprice__logo" />
        )}
        <div className="price">
          {fetched && coinData[coin][currency]?.toFixed(2)}
        </div>
        <span style={{ fontSize: ".7rem", marginTop: 2 }}>
          {fetched && currency.toUpperCase()}
        </span>
      </div>
    </Tooltip>
  );
};

export default CoinPrice;
