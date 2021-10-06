import { useState, Suspense } from "react";
import { SettingsContext } from "./context/SettingsContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import AxiesScreen from "./screens/AxiesScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RankingScreen from "./screens/RankingScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ToolsScreen from "./screens/ToolsScreen";
import AboutScreen from "./screens/AboutScreen";

function App() {
  const _language = localStorage.getItem("i18nextLng");
  const _currency = localStorage.getItem("currency");
  const [language, setLanguage] = useState(_language ? _language : "en-US");
  const [currency, setCurrency] = useState(_currency ? _currency : "usd");

  // useEffect(() => {
  //   let _currency = localStorage.getItem("currency");
  //   let _language = localStorage.getItem("language");

  //   if (!_language) {
  //     localStorage.setItem("language", "en-US");
  //     setLanguage("en-US");
  //   } else {
  //     setLanguage(_language);
  //   }

  //   if (!_currency) {
  //     localStorage.setItem("currency", "usd");
  //     setCurrency("usd");
  //   } else {
  //     setCurrency(_currency);
  //   }
  // }, []);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency }}
    >
      <Suspense fallback="loading">
        <div className="App">
          <Router>
            <div className="app__left">
              <Sidebar />
            </div>
            <div className="app__right">
              <Toolbar />
              <div className="app__main">
                <div className="app__content">
                  <Switch>
                    <Route exact path="/">
                      <DashboardScreen />
                    </Route>
                    <Route exact path="/axies" component={AxiesScreen} />
                    <Route exact path="/calendar" component={CalendarScreen} />
                    <Route exact path="/ranking" component={RankingScreen} />
                    <Route exact path="/tools" component={ToolsScreen} />
                    <Route exact path="/about" component={AboutScreen} />
                  </Switch>
                </div>
              </div>
              <Footer />
            </div>
          </Router>
        </div>
      </Suspense>
    </SettingsContext.Provider>
  );
}

export default App;
