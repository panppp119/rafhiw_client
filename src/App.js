import React from 'react';
import Loadable from 'react-loadable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import asyncComponent from 'components/AsyncComponent';
import ComponentLoading from 'components/loading/ComponentLoading'

import './styles/main.scss'

const AsyncNotFound = asyncComponent(() => import('pages/NotFound'));
const AsyncHome = Loadable({
  loader: () => import('pages/Home'),
  loading: ComponentLoading
});
const AsyncSignIn = Loadable({
  loader: () => import('pages/SignIn'),
  loading: ComponentLoading
});
const AsyncRegister = Loadable({
  loader: () => import('pages/Register'),
  loading: ComponentLoading
});
const AsyncEvents = Loadable({
  loader: () => import('pages/Events'),
  loading: ComponentLoading
});
const AsyncCategories = Loadable({
  loader: () => import('pages/Categories'),
  loading: ComponentLoading
});
const AsyncSubCategories = Loadable({
  loader: () => import('pages/SubCategories'),
  loading: ComponentLoading
});
const AsyncProducts = Loadable({
  loader: () => import('pages/Products'),
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
      <Route
        path="/sign_in"
        component={AsyncSignIn}
        props={childProps}
      />
      <Route
        path="/register"
        component={AsyncRegister}
        props={childProps}
      />
      <Route
        path="/events"
        component={AsyncEvents}
        props={childProps}
      />
      <Route
        path="/categories"
        component={AsyncCategories}
        props={childProps}
      />
      <Route
        path="/sub_categories"
        component={AsyncSubCategories}
        props={childProps}
      />
      <Route
        path="/products"
        component={AsyncProducts}
        props={childProps}
      />

      {/* Finally, catch all unmatched routes */}
      <Route component={AsyncNotFound} />
    </Switch>
  </Router>
;
