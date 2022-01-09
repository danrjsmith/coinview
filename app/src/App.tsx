import { makeStyles } from "@material-ui/styles";
import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { CryptoDataProvider } from "./contexts/CryptoDataProvider";
import { ThemeModeProvider } from "./hooks/useThemeMode";
import { Content } from "./routes/Content";
import { Dashboard } from "./routes/dashboard/Dashboard";
import { Header } from "./routes/Header";
import { AnimatedSwitch } from "./utils/AnimatedSwitch";

const useStyles = makeStyles({
  app: {
    display: "flex",
    justifyContent: "center",
    width: 730,
    flexDirection: "column",
    margin: "0 auto",
  },
});

const Router = () => {
  const classes = useStyles();

  return (
    <CryptoDataProvider>
      <ThemeModeProvider>
        <div className={classes.app}>
          <Header />
          <Content>
            <BrowserRouter>
              <AnimatedSwitch initial={true}>
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to="/dashboard" />
              </AnimatedSwitch>
            </BrowserRouter>
          </Content>
        </div>
      </ThemeModeProvider>
    </CryptoDataProvider>
  );
};

export function App() {
  return <Router />;
}
