import { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import axios from "axios";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import HelpIcon from "@material-ui/icons/Help";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import "./Settings.css";

import Backdrop from "./Backdrop";
import { SettingsContext } from "../context/SettingsContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    slider: {
      width: "100%",
    },
  })
);

function valuetext(value) {
  return `${value}°C`;
}

const Settings = ({ open, setOpen }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [currencyList, setCurrencyList] = useState([]);
  const [managerPercentage, setManagerPercentage] = useState(50);

  useEffect(() => {
    async function getCurrencyList() {
      let _currencyList = await axios.get(
        "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
      );
      setCurrencyList(_currencyList.data);
    }
    getCurrencyList();
  }, []);

  const { language, setLanguage, currency, setCurrency } =
    useContext(SettingsContext);

  const handleLanguageChange = (ev) => {
    setLanguage(ev.target.value);
    localStorage.setItem("i18nextLng", ev.target.value);
    i18n.changeLanguage(ev.target.value);
  };

  const handleCurrencyChange = (ev) => {
    setCurrency(ev.target.value);
    localStorage.setItem("currency", ev.target.value);
  };

  const handlePercentageChange = (ev, value) => {
    let newValue = parseInt(value);
    setManagerPercentage(newValue);
  };

  const saveInformation = () => {
    let percentages = {
      manager: managerPercentage,
      scholar: 100 - managerPercentage,
    };

    localStorage.setItem("percentages", JSON.stringify(percentages));
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div>
      <div className="settings__main">
        <div className="settings__header">
          <h3>{t("Settings")}</h3>
          <span className="settings__close" onClick={() => setOpen(false)}>
            <Tooltip title={t("Close")}>
              <CloseIcon />
            </Tooltip>
          </span>
        </div>
        <div className="settings__body">
          <FormControl className={classes.formControl}>
            <InputLabel id="language-label">{t("Language")}</InputLabel>
            <Select
              labelId="language-label"
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <MenuItem value="en-US">English</MenuItem>
              <MenuItem value="pt-BR">Português</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="currency-label">{t("Currency")}</InputLabel>
            <Select
              labelId="currency-label"
              id="currency-select"
              value={currency}
              onChange={handleCurrencyChange}
            >
              {currencyList.length > 1 &&
                currencyList.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div className="settings__sliderWrapper">
            <InputLabel
              id="slider-label"
              className="settings__splitInfoWrapper"
              style={{ display: "flex", lineHeight: 2, marginLeft: 8 }}
            >
              {t("Default split")}{" "}
              <div className="settings__splitInfo">
                <Tooltip
                  title={t(
                    "Default percentage split. You can still change that values when adding new scholars"
                  )}
                >
                  <HelpIcon />
                </Tooltip>
              </div>
            </InputLabel>
            <Slider
              labelId="slider-label"
              value={parseInt(managerPercentage)}
              name="slider"
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
              onChange={handlePercentageChange}
              style={{ marginBottom: "15px" }}
            />
            <div className="settings__percentage">
              <TextField
                id="manager-percentage"
                label={t("Manager percentage")}
                variant="outlined"
                value={managerPercentage}
                onChange={(ev) => setManagerPercentage(ev.target.value)}
              />
              <TextField
                id="scholar-percentage"
                label={t("Scholar percentage")}
                variant="outlined"
                value={100 - managerPercentage}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="settings__footer">
          <Button
            className="settings__btn"
            variant="outlined"
            onClick={saveInformation}
          >
            OK
          </Button>
        </div>
      </div>
      <Backdrop open={open} setOpen={setOpen} />
    </div>
  );
};

export default Settings;
