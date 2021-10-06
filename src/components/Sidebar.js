import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../hooks/useWindowSize";
import { Link } from "react-router-dom";

import DashboardIcon from "@material-ui/icons/Dashboard";
import AxiesIcon from "@material-ui/icons/Pets";
import ToolsIcon from "@material-ui/icons/Build";
import RankingIcon from "@material-ui/icons/EmojiEvents";
import CalendarIcon from "@material-ui/icons/Event";
import AboutIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import LeftIcon from "@material-ui/icons/ChevronLeft";
import AxieLogo from "../images/axie-logo-white.png";

import "./Sidebar.css";
import { SettingsPowerRounded } from "@material-ui/icons";

const Sidebar = () => {
  const [closed, setClosed] = useState(false);
  const [dashboardHover, setDashboardHover] = useState(false);
  const [axiesHover, setAxiesHover] = useState(false);
  const [calendarHover, setCalendarHover] = useState(false);
  const [rankingHover, setRankingHover] = useState(false);
  const [toolsHover, setToolsHover] = useState(false);
  const [aboutHover, setAboutHover] = useState(false);
  const [dashboardIconHover, setDashboardIconHover] = useState(false);
  const [axiesIconHover, setAxiesIconHover] = useState(false);
  const [calendarIconHover, setCalendarIconHover] = useState(false);
  const [rankingIconHover, setRankingIconHover] = useState(false);
  const [toolsIconHover, setToolsIconHover] = useState(false);
  const [aboutIconHover, setAboutIconHover] = useState(false);
  const { t } = useTranslation();
  const size = useWindowSize();

  const closeMenu = () => {
    setClosed(!closed);
  };

  useEffect(() => {
    if (size.width < 650) {
      setClosed(true);
    } else {
      setClosed(false);
    }
  }, [size]);

  return (
    <div className={closed ? "sidebar__main sidebar__close" : "sidebar__main"}>
      <div className="sidebar__left">
        <div
          className={
            closed ? "sidebar__menu sidebar__menuClosed" : "sidebar__menu"
          }
          onClick={closed ? closeMenu : null}
          title={t("Open")}
        >
          <MenuIcon />
        </div>

        <Link to="/" className="sidebar__link">
          <div
            className={
              dashboardHover
                ? "sidebar__icon sidebar__iconHover"
                : "sidebar__icon"
            }
            onMouseEnter={() => setDashboardIconHover(true)}
            onMouseLeave={() => setDashboardIconHover(false)}
            title={t("Dashboard")}
          >
            <DashboardIcon />
          </div>
        </Link>
        <Link to="/axies" className="sidebar__link">
          <div
            className={
              axiesHover ? "sidebar__icon sidebar__iconHover" : "sidebar__icon"
            }
            onMouseEnter={() => setAxiesIconHover(true)}
            onMouseLeave={() => setAxiesIconHover(false)}
            title={t("Axies")}
          >
            <AxiesIcon />
          </div>
        </Link>
        <Link to="/calendar" className="sidebar__link">
          <div
            className={
              calendarHover
                ? "sidebar__icon sidebar__iconHover"
                : "sidebar__icon"
            }
            onMouseEnter={() => setCalendarIconHover(true)}
            onMouseLeave={() => setCalendarIconHover(false)}
            title={t("Calendar")}
          >
            <CalendarIcon />
          </div>
        </Link>
        <Link to="/ranking" className="sidebar__link">
          <div
            className={
              rankingHover
                ? "sidebar__icon sidebar__iconHover"
                : "sidebar__icon"
            }
            onMouseEnter={() => setRankingIconHover(true)}
            onMouseLeave={() => setRankingIconHover(false)}
            title={t("Ranking")}
          >
            <RankingIcon />
          </div>
        </Link>
        <Link to="/tools" className="sidebar__link">
          <div
            className={
              toolsHover ? "sidebar__icon sidebar__iconHover" : "sidebar__icon"
            }
            onMouseEnter={() => setToolsIconHover(true)}
            onMouseLeave={() => setToolsIconHover(false)}
            title={t("Tools")}
          >
            <ToolsIcon />
          </div>
        </Link>
        <Link to="/about" className="sidebar__link">
          <div
            className={
              aboutHover ? "sidebar__icon sidebar__iconHover" : "sidebar__icon"
            }
            onMouseEnter={() => setAboutIconHover(true)}
            onMouseLeave={() => setAboutIconHover(false)}
            title={t("About")}
          >
            <AboutIcon />
          </div>
        </Link>
      </div>

      <div
        className={closed ? "sidebar__right sidebar__close" : "sidebar__right"}
      >
        <ul>
          <li
            className={
              closed
                ? "sidebar__logoWrapper sidebar__close"
                : "sidebar__logoWrapper"
            }
            style={{ paddingTop: 10 }}
          >
            <div className="sidebar__logo">
              <img
                src={AxieLogo}
                alt="Axie logo"
                height={35}
                style={{ marginTop: 4 }}
              />
              <div title={t("Close")}>
                {/* <LeftIcon
                  style={{
                    fontSize: 35,
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  className="sidebar__leftIcon"
                  onClick={closeMenu}
                /> */}
              </div>
            </div>
          </li>
          <Link to="/" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : dashboardIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setDashboardHover(true)}
              onMouseLeave={() => setDashboardHover(false)}
              title={t("Dashboard")}
            >
              {t("Dashboard")}
            </li>
          </Link>
          <Link to="/axies" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : axiesIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setAxiesHover(true)}
              onMouseLeave={() => setAxiesHover(false)}
              title={t("Axies")}
            >
              Axies
            </li>
          </Link>
          <Link to="/calendar" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : calendarIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setCalendarHover(true)}
              onMouseLeave={() => setCalendarHover(false)}
              title={t("Calendar")}
            >
              {t("Calendar")}
            </li>
          </Link>
          <Link to="/ranking" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : rankingIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setRankingHover(true)}
              onMouseLeave={() => setRankingHover(false)}
              title={t("Ranking")}
            >
              {t("Ranking")}
            </li>
          </Link>
          <Link to="/tools" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : toolsIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setToolsHover(true)}
              onMouseLeave={() => setToolsHover(false)}
              title={t("Tools")}
            >
              {t("Tools")}
            </li>
          </Link>
          <Link to="/about" className="sidebar__link">
            <li
              className={
                closed
                  ? "sidebar__open sidebar__close"
                  : aboutIconHover
                  ? "sidebar__iconHover sidebar__open"
                  : "sidebar__open"
              }
              onMouseEnter={() => setAboutHover(true)}
              onMouseLeave={() => setAboutHover(false)}
              title={t("About")}
            >
              {t("About")}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
