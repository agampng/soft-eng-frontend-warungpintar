import React from "react";
import { createBrowserHistory } from "history";
import "assets/scss/style.scss";
import { Router, Route, Switch } from "react-router-dom";

import Landing from "pages/landing";
import Home from "pages/home";
import DetailPoke from "pages/detail";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  return (
    <div className="App">
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail/:id" component={DetailPoke} />
          <Route exact path="/sss" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
