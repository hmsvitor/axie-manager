import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../hooks/useWindowSize";

import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";

import Settings from "./Settings";
import { SettingsContext } from "../context/SettingsContext";
import CoinPrice from "./CoinPrice";
import axsLogo from "../images/axs.png";
import ethLogo from "../images/eth.png";
import slpLogo from "../images/slp.png";
import "./Toolbar.css";

const Toolbar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const { t } = useTranslation();
  const { currency } = useContext(SettingsContext);
  const size = useWindowSize();

  useEffect(() => {
    console.log(currency);
  }, [currency]);

  if (size.width < 750) {
    return (
      <div className="toolbar__wrapper">
        <div className="toolbar__main">
          <div className="toolbar__mainWrapper">
            <span className="toolbar__title">Axie Manager</span>
            <div className="toolbar__settings">
              <Tooltip title={t("Settings")}>
                <SettingsIcon
                  style={{ fontSize: 30 }}
                  onClick={() => setOpenSettings(!openSettings)}
                />
              </Tooltip>
            </div>
          </div>

          <div className="toolbar__coins">
            <CoinPrice
              currency={currency}
              image={slpLogo}
              coin="smooth-love-potion"
            />
            <CoinPrice
              currency={currency}
              image={axsLogo}
              coin="axie-infinity"
            />
            <CoinPrice currency={currency} image={ethLogo} coin="ethereum" />
          </div>
        </div>

        <Settings open={openSettings} setOpen={setOpenSettings} />
      </div>
    );
  } else {
    return (
      <div className="toolbar__wrapper">
        <div className="toolbar__main">
          <span style={{ marginLeft: 20 }}>Axie Manager</span>
          <div className="toolbar__coins">
            <CoinPrice
              currency={currency}
              image={slpLogo}
              coin="smooth-love-potion"
            />
            <CoinPrice
              currency={currency}
              image={axsLogo}
              coin="axie-infinity"
            />
            <CoinPrice currency={currency} image={ethLogo} coin="ethereum" />
          </div>

          <div className="toolbar__settings">
            <Tooltip title={t("Settings")}>
              <SettingsIcon
                style={{ fontSize: 30 }}
                onClick={() => setOpenSettings(!openSettings)}
              />
            </Tooltip>
          </div>
        </div>

        <Settings open={openSettings} setOpen={setOpenSettings} />
      </div>
    );
  }
};

export default Toolbar;
