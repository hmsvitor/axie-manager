import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Totals from "../components/Totals";
import { SettingsContext } from "../context/SettingsContext";
import NewScholar from "../components/NewScholar";
import "./DashboardScreen.css";
import { useStore } from "../store/index";
import ScholarCard from "../components/ScholarCard";

const DashboardScreen = () => {
  const { currency } = useContext(SettingsContext);
  const [coinData, setCoinData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newScholarOpen, setNewScholarOpen] = useState(false);
  const [totalAverage, setTotalAverage] = useState({});
  const [totalAverageValue, setTotalAverageValue] = useState(0);
  const [totalSlp, setTotalSlp] = useState({});
  const [totalSlpValue, setTotalSlpValue] = useState(0);
  const [totalUnclaimed, setTotalUnclaimed] = useState({});
  const [totalUnclaimedValue, setTotalUnclaimedValue] = useState(0);
  const [totalClaimed, setTotalClaimed] = useState({});
  const [totalClaimedValue, setTotalClaimedValue] = useState(0);
  const [totalWallet, setTotalWallet] = useState({});
  const [totalWalletValue, setTotalWalletValue] = useState(0);
  const [totalManager, setTotalManager] = useState({});
  const [totalManagerValue, setTotalManagerValue] = useState(0);
  const [totalScholar, setTotalScholar] = useState({});
  const [totalScholarValue, setTotalScholarValue] = useState(0);
  const [scholarsState, setScholarsState] = useState([]);
  const { t } = useTranslation();
  const localScholarsState = useStore.subscribe((state) =>
    scholarsState.length > 0 && scholarsState[0].hasOwnProperty("totalSlp")
      ? null
      : setScholarsState(state.scholars)
  );

  const setInitialState = useStore((state) => state.setInitialState);
  const scholarsStore = useStore((state) => state.scholars);

  useEffect(() => {
    getSlpPrice();
  }, [currency]);

  useEffect(() => {
    const _average = Object.values(totalAverage);
    const sum = Math.floor(
      _average.reduce((a, b) => a + b, 0) / _average.length
    );
    setTotalAverageValue(sum);
  }, [totalAverage]);

  useEffect(() => {
    const _total = Object.values(totalSlp);
    const sum = Math.floor(_total.reduce((a, b) => a + b, 0));
    setTotalSlpValue(sum);
  }, [totalSlp]);

  useEffect(() => {
    const _total = Object.values(totalUnclaimed);
    const sum = Math.floor(_total.reduce((a, b) => a + b, 0));
    setTotalUnclaimedValue(sum);
  }, [totalUnclaimed]);

  useEffect(() => {
    const _total = Object.values(totalManager);
    const sum = Math.floor(
      _total.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    );
    setTotalManagerValue(sum);
    console.log("TOTAL MANAGER CHANGE: ", totalManager);
  }, [totalManager]);

  useEffect(() => {
    const _total = Object.values(totalScholar);
    const sum = Math.floor(
      _total.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    );
    setTotalScholarValue(sum);
    console.log("TOTAL SCHOLAR CHANGE: ", totalScholar);
  }, [totalScholar]);

  useEffect(() => {
    const _total = Object.values(totalWallet);
    const sum = Math.floor(_total.reduce((a, b) => a + b, 0));
    setTotalWalletValue(sum);
    console.log("TOTAL WALLET CHANGE: ", totalWallet);
  }, [totalWallet]);

  useEffect(() => {
    let scholars = JSON.parse(localStorage.getItem("scholars"));

    if (scholars && scholars.length > 0 && scholarsState.length === 0) {
      setInitialState(scholars);
    }
  }, []);

  const getSlpPrice = async () => {
    let res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=${currency}`
    );

    setCoinData(res.data);
    setLoading(false);
    setFetched(true);
  };

  return (
    <div className="dashboardScreen">
      <div className="dashboardScreen__main">
        <Totals
          title={t("Average per day")}
          coinTotal={totalAverageValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
        <Totals
          title={t("Total SLP")}
          coinTotal={totalSlpValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
        <Totals
          title={t("Total unclaimed")}
          coinTotal={totalUnclaimedValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
        <Totals
          title={t("Total in wallet")}
          coinTotal={totalWalletValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
        <Totals
          title={t("Total manager")}
          coinTotal={totalManagerValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
        <Totals
          title={t("Total scholar")}
          coinTotal={totalScholarValue}
          coinData={coinData}
          currency={currency}
          fetched={fetched}
        />
      </div>
      <div className="dashboardScreen__add">
        <button
          className="dashboardScreen__addBtn"
          onClick={() => setNewScholarOpen(true)}
        >
          +
        </button>
        {newScholarOpen && (
          <NewScholar open={newScholarOpen} setOpen={setNewScholarOpen} />
        )}
      </div>
      <div className="dashboardScreen__scholars">
        {scholarsState.length > 0 &&
          scholarsState.map((scho, key) => (
            <ScholarCard
              scholar={scholarsState[key]}
              setTotalAverage={setTotalAverage}
              setTotalSlp={setTotalSlp}
              setTotalUnclaimed={setTotalUnclaimed}
              setTotalClaimed={setTotalClaimed}
              setTotalManager={setTotalManager}
              setTotalScholar={setTotalScholar}
              setTotalWallet={setTotalWallet}
            />
          ))}
      </div>
    </div>
  );
};

export default DashboardScreen;
