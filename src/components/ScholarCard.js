import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import ReactHover, { Trigger, Hover } from "react-hover";

import CircularProgress from "@material-ui/core/CircularProgress";
import PaymentIcon from "@material-ui/icons/Payment";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { SettingsContext } from "../context/SettingsContext";
import { useStore } from "../store/index";
import "./ScholarCard.css";
import AxieHover from "./AxieHover";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fefefe",
    },
  },
});

const ScholarCard = ({
  scholar,
  setTotalAverage,
  setTotalSlp,
  setTotalUnclaimed,
  setTotalClaimed,
  setTotalManager,
  setTotalScholar,
  setTotalWallet,
}) => {
  const { appendData } = useStore();
  const slpPrice = useStore((state) => state.slpPrice);

  const [open, setOpen] = useState(false);
  const [loadingSlp, setLoadingSlp] = useState(true);
  const [loadingMmr, setLoadingMmr] = useState(true);
  const [loadingAxieDetails, setLoadingAxieDetails] = useState(true);
  const [loadingAxies, setLoadingAxies] = useState(true);
  const [loading, setLoading] = useState(true);
  const [localScholarState, setLocalScholarState] = useState(scholar);
  const [nextClaimDays, setNextClaimDays] = useState(0);
  const [nextClaimHours, setNextClaimHours] = useState(0);
  const [nextClaimMin, setNextClaimMin] = useState(0);
  const { currency } = useContext(SettingsContext);
  const { t } = useTranslation();

  useEffect(() => {
    getSlpdata();
  }, []);

  useEffect(() => {
    if (!loadingSlp) {
      getMmrData();
    }
  }, [loadingSlp]);

  useEffect(() => {
    if (!loadingMmr) {
      getAxiesData();
    }
  }, [loadingMmr]);

  useEffect(() => {
    if (!loadingAxies) {
      getAxiesDetail();
    }
  }, [loadingAxies]);

  useEffect(() => {
    if (loadingMmr && loadingSlp) {
      setLoading(false);
    }
  }, [loadingMmr, loadingSlp]);

  const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: -200,
  };

  const getSlpdata = async () => {
    if (localScholarState.nextClaimTimestamp) return;
    const _address = scholar.address.replace("ronin:", "0x");
    const slpData = await axios.get(`http://localhost:3420/slp`, {
      params: { wallet: _address },
    });
    let _slp;
    let _nextClaim;

    // _nextClaim = 0.01;
    if (slpData.status !== 200) return;

    let _averageDaySlp = Math.floor(
      (slpData.data.walletData.total_slp - slpData.data.walletData.ronin_slp) /
        Math.round(
          (Math.floor(Date.now() / 1000) -
            slpData.data.walletData.claim_timestamp) /
            60 /
            60 /
            24
        )
    );

    const _tempTotalAverage = {};
    const _tempTotalSlp = {};
    const _tempTotalUnclaimed = {};
    const _tempTotalClaimed = {};
    const _tempTotalManager = {};
    const _tempTotalScholar = {};
    const _tempTotalWallet = {};
    _tempTotalWallet[_address] = slpData.data.walletData.ronin_slp;
    _tempTotalAverage[_address] = _averageDaySlp;
    _tempTotalSlp[_address] = slpData.data.walletData.total_slp;
    _tempTotalUnclaimed[_address] =
      slpData.data.walletData.total_slp - slpData.data.walletData.ronin_slp;
    _tempTotalClaimed[_address] = slpData.data.walletData.last_claim_amount;
    _tempTotalManager[_address] = parseFloat(
      slpData.data.walletData.total_slp * (scholar.percentages.manager / 100)
    ).toFixed(2);
    _tempTotalScholar[_address] =
      scholar.percentages.scholar === 0
        ? 0
        : parseFloat(
            slpData.data.walletData.total_slp *
              (scholar.percentages.scholar / 100)
          ).toFixed(2);
    setTotalAverage((state) => ({ ...state, ..._tempTotalAverage }));
    setTotalSlp((state) => ({ ...state, ..._tempTotalSlp }));
    setTotalUnclaimed((state) => ({ ...state, ..._tempTotalUnclaimed }));
    setTotalClaimed((state) => ({ ...state, ..._tempTotalClaimed }));
    setTotalManager((state) => ({ ...state, ..._tempTotalManager }));
    setTotalScholar((state) => ({ ...state, ..._tempTotalScholar }));
    setTotalWallet((state) => ({ ...state, ..._tempTotalWallet }));

    _nextClaim =
      (slpData.data.walletData.next_claim_timestamp -
        Math.floor(Date.now() / 1000)) /
      60 /
      60 /
      24;

    if (_nextClaim > 1) {
      setNextClaimDays(_nextClaim.toFixed(2));
    } else if (_nextClaim * 24 > 1) {
      setNextClaimHours(_nextClaim * 24);
    } else {
      setNextClaimMin(_nextClaim * 24 * 60);
    }

    if (slpData.status === 200) {
      _slp = {
        adventureSlp: slpData.data.walletData.adventureSLP,
        todaySlp: slpData.data.walletData.calendar.todaySLP,
        yesterdaySlp: slpData.data.walletData.calendar.yesterdaySLP,
        walletSlp: slpData.data.walletData.ronin_slp,
        claimedSlp: slpData.data.walletData.last_claim_amount,
        totalSlp: slpData.data.walletData.total_slp,
        nextClaimTimestamp: slpData.data.walletData.next_claim_timestamp,
        lastClaimTimestamp: slpData.data.walletData.claim_timestamp,
      };
    } else {
      _slp = {
        adventureSlp: 0,
        todaySlp: 0,
        yesterdaySlp: 0,
        walletSlp: 0,
        claimedSlp: 0,
        totalSlp: 0,
        nextClaimTimestamp: 0,
        lastClaimTimestamp: 0,
      };
    }

    appendData(_slp, scholar.address);
    setLocalScholarState((state) => ({ ...state, ..._slp }));
    setLoadingSlp(false);
  };

  const getMmrData = async () => {
    const _address = scholar.address.replace("ronin:", "0x");
    const mmrData = await axios.get(`http://localhost:3420/mmr`, {
      params: { address: _address },
    });

    if (mmrData.status !== 200) return;

    let _mmr;

    if (mmrData.status === 200) {
      _mmr = {
        mmr: mmrData.data.stats.elo,
        ranking: mmrData.data.stats.rank,
      };
    } else {
      _mmr = {
        mmr: 0,
        ranking: 0,
      };
    }

    appendData(_mmr, scholar.address);
    await setLocalScholarState((state) => ({ ...state, ..._mmr }));
    setLoadingMmr(false);
  };

  const getAxiesData = async () => {
    const _address = scholar.address.replace("ronin:", "0x");
    const axiesData = await axios.get(`http://localhost:3420/axies`, {
      params: { address: _address },
    });

    if (axiesData.status !== 200) return;

    let _axies;

    if (axiesData.status === 200) {
      _axies = axiesData.data;
    } else {
      _axies = null;
    }

    appendData(_axies, scholar.address);
    await setLocalScholarState((state) => ({ ...state, ..._axies }));
    setLoadingAxies(false);
  };

  const getAxiesDetail = async () => {
    let _localScholarState = { ...localScholarState };
    const promises = _localScholarState.available_axies.results.map(
      async (axie, index) => {
        const _axieDetail = await axios.get(
          "http://localhost:3420/axie-detail",
          {
            params: {
              id: axie.id,
            },
          }
        );
        return _axieDetail.data;
      }
    );

    const _axieDetails = await Promise.all(promises);

    for (let i = 0; i < localScholarState.available_axies.results.length; i++) {
      _localScholarState.available_axies.results[i].details = {
        ..._axieDetails[i],
      };
    }

    setLocalScholarState(_localScholarState);
    setLoadingAxieDetails(false);
  };

  const copyScholarPaymentAddress = (e) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(localScholarState.transferAddress);
      return;
    }
    navigator.clipboard.writeText(localScholarState.transferAddress).then(
      function () {
        handleClick();
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const copyScholarAddress = (e) => {
    console.log("PAssei aqui");
    if (!navigator.clipboard) {
      console.log("!navigator.clipboard");
      fallbackCopyTextToClipboard(localScholarState.address);
      return;
    }
    console.log("passou do IF");
    navigator.clipboard.writeText(localScholarState.address).then(
      function () {
        handleClick();
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  function fallbackCopyTextToClipboard(text) {
    console.log("falback", text);
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="scholarCard__main">
        {!loading && (
          <>
            <div className="scholarScard__top">
              <Tooltip title={t("Adventure mode")}>
                <div className="scholarCard__adventurerSlp">
                  {t("Adventure")}:{" "}
                  {localScholarState.totalSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.adventureSlp} / 50
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip
                title={t(
                  "Yesterday SLPs. This is in beta. You need refresh this page everyday for getting the correct amount SLP amount."
                )}
              >
                <div className="scholarCard__yesterdaySlp">
                  {t("Yesterday")}:{" "}
                  {localScholarState.totalSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.yesterdaySlp}
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip
                title={t(
                  "Today SLPs. This is in beta. You need refresh this page everyday for getting the correct amount SLP amount."
                )}
              >
                <div className="scholarCard__todaySlp">
                  {t("Today")}:{" "}
                  {localScholarState.totalSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.todaySlp -
                          localScholarState.yesterdaySlp}
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip title={t("Amount of SLP in the ronin wallet")}>
                <div className="scholarCard__totalSlpWallet">
                  {t("Wallet")}:{" "}
                  {localScholarState.totalSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.walletSlp}
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip title={t("Total in-game")}>
                <div className="scholarCard__totalSlpInGame">
                  {t("In-game")}:{" "}
                  {localScholarState.totalSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.totalSlp -
                          localScholarState.walletSlp}
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip title={t("Total claimed")}>
                <div className="scholarCard__totalSlpClaimed">
                  {t("Claimed")}:{" "}
                  {localScholarState.claimedSlp ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>
                        {localScholarState.claimedSlp}
                      </span>{" "}
                      <span className="scholarCard__slpLabelTop">SLP</span>
                    </>
                  ) : (
                    <CircularProgress
                      color="secondary"
                      style={{ marginLeft: 5 }}
                      size={15}
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip title={t("Copy scholar payment address")}>
                <div>
                  <PaymentIcon className="scholarCard__transferAddress" />
                  {localScholarState.transferAddress}
                </div>
              </Tooltip>
            </div>
            <div className="scholarCard__bottom">
              <div className="scholarCard__nicknameWrapper">
                <div className="scholarCard__wrap">
                  <Tooltip title={t("See scholar profile")}>
                    <a
                      href={`https://marketplace.axieinfinity.com/profile/ronin:${localScholarState.address.substring(
                        2
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="scholarCard__profileLink"
                    >
                      <span className="scholarCard__nickname">
                        {localScholarState.nickname}
                      </span>
                    </a>
                  </Tooltip>
                  <div>
                    <Tooltip title={localScholarState.address}>
                      <>
                        <span>
                          {localScholarState.address.substring(0, 4)}...
                          {localScholarState.address.substring(
                            localScholarState.address.length - 6,
                            localScholarState.address.length
                          )}
                        </span>
                        <span
                          id="scholarAddressClip"
                          style={{ display: "none" }}
                        >
                          {localScholarState.address}
                        </span>
                      </>
                    </Tooltip>
                    <Tooltip
                      title={t("Copy scholar address")}
                      onClick={copyScholarAddress}
                    >
                      <span
                        style={{ margin: 8, cursor: "pointer" }}
                        onClick={copyScholarAddress}
                      >
                        <FileCopyIcon fontSize="small" />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <div className="scholarCard__axies">
                    {loadingAxieDetails ? (
                      <>
                        <CircularProgress
                          color="secondary"
                          style={{ margin: "10px 0 0 15px" }}
                          size={25}
                        />
                        <CircularProgress
                          color="secondary"
                          style={{ margin: "10px 0 0 30px" }}
                          size={25}
                        />
                        <CircularProgress
                          color="secondary"
                          style={{ margin: "10px 0 0 30px" }}
                          size={25}
                        />
                      </>
                    ) : (
                      localScholarState.available_axies.results.map(
                        (axie, key) => {
                          if (key <= 2) {
                            return (
                              <ReactHover
                                options={optionsCursorTrueWithMargin}
                                key={axie.id}
                              >
                                <Trigger type="trigger">
                                  <img
                                    src={axie.image}
                                    alt="axie"
                                    // width={60}
                                    className="scholarCard__axieImg"
                                  />
                                </Trigger>
                                <Hover type="hover">
                                  <AxieHover axie={axie} />
                                </Hover>
                              </ReactHover>
                            );
                          }
                        }
                      )
                    )}
                  </div>
                </div>
                <span>{localScholarState.name}</span>
              </div>
              <div className="scholarCard__averageSlpDay">
                <span>{t("Average/day")}</span>
                {localScholarState.totalSlp ? (
                  <>
                    <span className="scholarCard__value">
                      {Math.floor(
                        (localScholarState.totalSlp -
                          localScholarState.walletSlp) /
                          Math.round(
                            (Math.floor(Date.now() / 1000) -
                              localScholarState.lastClaimTimestamp) /
                              60 /
                              60 /
                              24
                          )
                      )}{" "}
                      <span className="scholarCard__slpLabelBottom">SLP</span>
                    </span>
                    <span>
                      (
                      {slpPrice > 0 &&
                        `${(
                          Math.floor(
                            (localScholarState.totalSlp -
                              localScholarState.walletSlp) /
                              Math.round(
                                (Math.floor(Date.now() / 1000) -
                                  localScholarState.lastClaimTimestamp) /
                                  60 /
                                  60 /
                                  24
                              )
                          ) * slpPrice
                        ).toFixed(2)} ${currency.toUpperCase()}`}
                      )
                    </span>
                  </>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px 0 0 10px" }}
                  />
                )}
              </div>
              <div className="scholarCard__totalSlp">
                <span>Total</span>
                {localScholarState.totalSlp ? (
                  <>
                    <span className="scholarCard__value">
                      {localScholarState.totalSlp}{" "}
                      <span className="scholarCard__slpLabelBottom">SLP</span>
                    </span>
                    <span>
                      (
                      {slpPrice > 0 &&
                        `${(localScholarState.totalSlp * slpPrice).toFixed(
                          2
                        )} ${currency.toUpperCase()}`}
                      )
                    </span>
                  </>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px 0 0 10px" }}
                  />
                )}
              </div>
              <div className="scholarCard__managerPercentage">
                <span>
                  {t("Manager")} ({localScholarState.percentages.manager}%)
                </span>
                {localScholarState.totalSlp ? (
                  <>
                    <span className="scholarCard__value">
                      {(
                        (localScholarState.percentages.manager / 100) *
                        localScholarState.totalSlp
                      ).toFixed(0)}{" "}
                      <span className="scholarCard__slpLabelBottom">SLP</span>
                    </span>
                    <span>
                      (
                      {slpPrice > 0 &&
                        `${(
                          (localScholarState.percentages.manager / 100) *
                          localScholarState.totalSlp *
                          slpPrice
                        ).toFixed(2)} ${currency.toUpperCase()}`}
                      )
                    </span>
                  </>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px 0 0 10px" }}
                  />
                )}
              </div>
              <div className="scholarCard__scholarPercentage">
                <span>
                  {t("Scholar")} ({localScholarState.percentages.scholar}%)
                </span>
                {localScholarState.totalSlp ? (
                  <>
                    <span className="scholarCard__value">
                      {(
                        (localScholarState.percentages.scholar / 100) *
                        localScholarState.totalSlp
                      ).toFixed(0)}{" "}
                      <span className="scholarCard__slpLabelBottom">SLP</span>
                    </span>
                    <span>
                      (
                      {slpPrice > 0 &&
                        `${(
                          (localScholarState.percentages.scholar / 100) *
                          localScholarState.totalSlp *
                          slpPrice
                        ).toFixed(2)} ${currency.toUpperCase()}`}
                      )
                    </span>
                  </>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px 0 0 10px" }}
                  />
                )}
              </div>
              <div className="scholarCard__dateNextClaim">
                <span>{t("Next claim")}</span>
                {localScholarState.totalSlp ? (
                  <span className="scholarCard__nextClaimValue">
                    {nextClaimDays > 1
                      ? `${Math.floor(nextClaimDays)} ${
                          nextClaimDays < 2 ? t("day") : t("days")
                        }`
                      : nextClaimHours > 1
                      ? `${Math.floor(nextClaimHours)} ${
                          nextClaimHours < 2 ? t("hour") : t("hours")
                        }`
                      : nextClaimMin > 1
                      ? `${Math.floor(nextClaimMin)} ${
                          nextClaimMin < 2 ? t("minute") : t("minutes")
                        }`
                      : t("Now")}
                  </span>
                ) : (
                  <CircularProgress
                    color="secondary"
                    style={{ margin: "20px 0 0 10px" }}
                  />
                )}
              </div>
              <Tooltip title={t("Scholar MMR (Arena trophies)")}>
                <div className="scholarCard__mmr">
                  <span>MMR</span>
                  <span className="scholarCard__value">
                    {loadingMmr ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      localScholarState.mmr
                    )}
                  </span>
                </div>
              </Tooltip>
            </div>
          </>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={t("Address copied!")}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />

        {loading && <CircularProgress color="secondary" />}
      </div>
    </ThemeProvider>
  );
};

export default ScholarCard;
