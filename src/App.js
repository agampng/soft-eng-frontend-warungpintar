import React from "react";
import { createBrowserHistory } from "history";
import "assets/scss/style.scss";
import { Router, Route, Switch } from "react-router-dom";

import Home from "pages/home";
import DetailPoke from "pages/detail";
import Compare from "pages/compare";

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
          <Route exact path="/detail/:name1/:name2" component={Compare} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
