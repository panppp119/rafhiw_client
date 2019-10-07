import React from 'react';
import Loadable from 'react-loadable'
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';

import configStore, { history } from 'utils/configStore';
import asyncComponent from 'components/AsyncComponent';
import ComponentLoading from 'components/loading/ComponentLoading'
import StoreLoading from 'components/loading/StoreLoading'

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
const AsyncEvent = Loadable({
  loader: () => import('pages/Event'),
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
const AsyncProduct = Loadable({
  loader: () => import('pages/Product'),
  loading: ComponentLoading
});
const AsyncAccount = Loadable({
  loader: () => import('pages/Account'),
  loading: ComponentLoading
});
const AsyncStore = Loadable({
  loader: () => import('pages/Store'),
  loading: StoreLoading
});
const AsyncCart = Loadable({
  loader: () => import('pages/Cart'),
  loading: ComponentLoading
});
const AsyncCheckout = Loadable({
  loader: () => import('pages/Checkout'),
  loading: ComponentLoading
});

// const history = createBrowserHistory();
const store = configStore(history);

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        JSON.parse(localStorage.getItem('auth')) !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ({ childProps }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
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
            path="/e/:id"
            component={AsyncEvent}
            props={childProps}
          />
          <Route
            path='/c/:slug'
            component={AsyncCategories}
            props={childProps}
          />
          <Route
            path="/sc/:slug"
            component={AsyncSubCategories}
            props={childProps}
          />
          <Route
            path="/products"
            component={AsyncProducts}
            props={childProps}
          />
          <Route
            path="/p/:id"
            component={AsyncProduct}
            props={childProps}
          />
          <PrivateRoute
            path="/account"
            component={AsyncAccount}
            props={childProps}
          />
          <PrivateRoute
            path="/store"
            component={AsyncStore}
            props={childProps}
          />
          <PrivateRoute
            path="/cart"
            component={AsyncCart}
            props={childProps}
          />
          <PrivateRoute
            path="/checkout"
            component={AsyncCheckout}
            props={childProps}
          />

          {/* Finally, catch all unmatched routes */}
          <Route component={AsyncNotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
;
