
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'

import rootReducer from 'reducers';

export const history = createBrowserHistory({
  basename: '/'
})

export default function configureStore(history) {
  const enhancers = [];
  const middleware = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(rootReducer(history), composedEnhancers);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(rootReducer(history));
    });
  }

  return store;
}
