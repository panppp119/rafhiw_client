import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: require('./ui').default,
    info: require('./info').default,

    auth: require('./auth').default,
  });

export default rootReducer;
