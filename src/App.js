import React from 'react';
import Loadable from 'react-loadable'
import { Provider } from 'react-redux';
import { Map } from 'immutable'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable';

import configStore, { history } from 'utils/configStore';
import asyncComponent from 'components/AsyncComponent';
import ComponentLoading from 'components/loading/ComponentLoading'
import StoreLoading from 'components/loading/StoreLoading'
import { userIsAuthenticated, userIsNotAuthenticated } from './auth'

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
const AsyncTermsOfService = Loadable({
  loader: () => import('pages/TermsOfService'),
  loading: ComponentLoading
});
const AsyncPrivacyPolicy = Loadable({
  loader: () => import('pages/PrivacyPolicy'),
  loading: ComponentLoading
});
const AsyncProhibited = Loadable({
  loader: () => import('pages/Prohibited'),
  loading: ComponentLoading
});

// const history = createBrowserHistory();
const initialState = Map()
const store = configStore(initialState);

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
            component={userIsNotAuthenticated(AsyncSignIn)}
            props={childProps}
          />
          <Route
            path="/register"
            component={userIsNotAuthenticated(AsyncRegister)}
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

          <Route
            path="/terms_of_service"
            component={AsyncTermsOfService}
            props={childProps}
          />
          <Route
            path="/privacy_policy"
            component={AsyncPrivacyPolicy}
            props={childProps}
          />
          <Route
            path="/prohibited_goods_policy"
            component={AsyncProhibited}
            props={childProps}
          />

          <Route
            path="/account"
            component={userIsAuthenticated(AsyncAccount)}
            props={childProps}
          />
          <Route
            path="/store"
            component={userIsAuthenticated(AsyncStore)}
            props={childProps}
          />
          <Route
            path="/cart"
            component={userIsAuthenticated(AsyncCart)}
            props={childProps}
          />
          <Route
            path="/checkout"
            component={userIsAuthenticated(AsyncCheckout)}
            props={childProps}
          />

          {/* Finally, catch all unmatched routes */}
          <Route component={AsyncNotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
;
