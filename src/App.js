import React from 'react';
import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import asyncComponent from 'components/AsyncComponent';
import ComponentLoading from 'components/loading/ComponentLoading'

const AsyncNotFound = asyncComponent(() => import('pages/NotFound'));
const AsyncHome = Loadable({
  loader: () => import('pages/Home'),
  loading: ComponentLoading
});

export default ({ childProps }) =>
  <Router>
    <Switch>
      <Route
        path="/"
        exact
        component={AsyncHome}
        props={childProps}
      />

      {/* Finally, catch all unmatched routes */}
      <Route component={AsyncNotFound} />
    </Switch>
  </Router>
;
