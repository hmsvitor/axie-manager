import { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@material-ui/core/styles";

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
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import "./NewScholar.css";

import Backdrop from "./Backdrop";
import { SettingsContext } from "../context/SettingsContext";
import { whiteTheme } from "../utils/customColors";
import { useStore } from "../store/index";

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
    loader: {
      margin: "0 0 10px 10px",
    },
  })
);

function valuetext(value) {
  return `${value}°C`;
}

const NewScholar = ({ open, setOpen }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [roninAddress, setRoninAddress] = useState("");
  const [ign, setIgn] = useState("");
  const [managerPercentage, setManagerPercentage] = useState(
    JSON.parse(localStorage.getItem("percentages")).manager
  );
  const [scholarName, setScholarName] = useState("");
  const [scholarTransferAddress, setScholarTransferAddress] = useState("");
  const [loadingNewScholar, setLoadingNewScholar] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const scholarsState = useStore((state) => state.scholars);
  const addScholarState = useStore((state) => state.addScholar);

  useEffect(() => {
    console.log("SCHOLARS: ", scholarsState);
  }, [scholarsState]);
  useEffect(() => {
    if (!open) {
      setRoninAddress("");
      setIgn("");
      setScholarName("");
      setScholarTransferAddress("");
      setWarning(false);
      setRequestFailed(false);
      setWarningMsg("");
    }
  }, [open]);

  const handleRoninAdressChange = async (ev) => {
    setRoninAddress(ev.target.value);
    setWarning(false);
    if (!ev.target.value) {
      setWarning(false);
      setRequestFailed(false);
      setIgn("");
      return;
    }

    let _address = ev.target.value.replace("ronin:", "0x");
    setLoadingNewScholar(true);
    let res = await axios.get(
      `https://axie-proxy.secret-shop.buzz/_basicStats/${_address}`
    );

    if (res.data.status === "error") {
      setRequestFailed(true);
      setLoadingNewScholar(false);
      setIgn("");
      return;
    }

    if (res.data.stats.name) {
      setIgn(res.data.stats.name);
      setLoadingNewScholar(false);
      setRequestFailed(false);
    } else {
      setRequestFailed(true);
      setLoadingNewScholar(false);
    }
  };

  const handlePercentageChange = (ev, value) => {
    let newValue = parseInt(value);
    setManagerPercentage(newValue);
  };

  const addScholar = () => {
    if (!roninAddress || !ign) {
      setOpen(false);
      return;
    }

    let _newScholar = {
      address: roninAddress.replace("ronin:", "0x"),
      nickname: ign,
      percentages: {
        manager: managerPercentage,
        scholar: 100 - managerPercentage,
      },
      name: scholarName,
      transferAddress: scholarTransferAddress,
    };

    let scholarsArr = JSON.parse(localStorage.getItem("scholars"));

    if (scholarsArr && scholarsArr.length >= 1) {
      let found = scholarsArr.find((sch) => sch.address === roninAddress);

      if (found) {
        setWarning(true);
        setWarningMsg("Scholar already added");
        return;
      } else {
        scholarsArr.push(_newScholar);
        localStorage.setItem("scholars", JSON.stringify(scholarsArr));
        addScholarState(_newScholar);
        setOpen(false);
      }
    } else {
      let _scholars = [_newScholar];

      localStorage.setItem("scholars", JSON.stringify(_scholars));
      addScholarState(_newScholar);
      setOpen(false);
    }
  };

  if (!open) return null;
  return (
    <div>
      <div className="newScholar__main">
        <div className="newScholar__header">
          <div className="newScholar__loader">
            <h3>{t("Add scholar")}</h3>
            {loadingNewScholar && (
              <ThemeProvider theme={whiteTheme}>
                <CircularProgress
                  color="secondary"
                  className={classes.loader}
                  size={20}
                />
              </ThemeProvider>
            )}
          </div>

          <span className="newScholar__close" onClick={() => setOpen(false)}>
            <Tooltip title={t("Close")}>
              <CloseIcon />
            </Tooltip>
          </span>
        </div>
        <div className="newScholar__body">
          <FormControl className={classes.formControl}>
            <TextField
              error={requestFailed}
              helperText={requestFailed && t("Account not found")}
              label={t("Ronin public address")}
              id="ronin-address"
              value={roninAddress ? roninAddress : ""}
              onChange={handleRoninAdressChange}
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              label={t("In-game nickname")}
              id="ign"
              value={ign}
              variant="outlined"
              disabled
            ></TextField>
          </FormControl>
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
            style={{ margin: "10px 0 20px 0" }}
          />
          <div className="settings__percentage">
            <FormControl className={classes.formControl}>
              <TextField
                id="manager-percentage"
                label={t("Manager percentage")}
                variant="outlined"
                value={managerPercentage}
                onChange={(ev) => setManagerPercentage(ev.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="scholar-percentage"
                label={t("Scholar percentage")}
                variant="outlined"
                value={100 - managerPercentage}
                disabled
              />
            </FormControl>
          </div>
          <FormControl className={classes.formControl}>
            <TextField
              id="scholar-name"
              label={t("Name (optional)")}
              variant="outlined"
              value={scholarName}
              onChange={(ev) => setScholarName(ev.target.value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="scholar-transfer-address"
              label={t("Transfer address (optional)")}
              variant="outlined"
              value={scholarTransferAddress}
              onChange={(ev) => setScholarTransferAddress(ev.target.value)}
            />
          </FormControl>
        </div>
        <div className="newScholar__footer">
          <Button
            className="newScholar__btn"
            variant="outlined"
            onClick={addScholar}
            width={500}
          >
            {t("Add")}
          </Button>
          <Alert
            className={
              warning
                ? "newScholar__warning newScholar__warningActive"
                : "newScholar__warning"
            }
            severity="warning"
          >
            {t(warningMsg)}
          </Alert>
        </div>
      </div>
      <Backdrop open={open} setOpen={setOpen} />
    </div>
  );
};

export default NewScholar;
