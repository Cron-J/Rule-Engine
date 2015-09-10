import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from 'components/App.react';
import Home from 'components/Home.react';
import RuleEngine from 'components/ruleEngine/ruleEngHome.react';
import RuleComponent from 'components/ruleEngine/rule.react.js';

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="ruleEngineHome" path="/rule" handler={RuleEngine} />
     <Route name="newRule" path="/newRule" handler={RuleComponent} />
    <DefaultRoute handler={Home} />
  </Route>
);

export default routes;
