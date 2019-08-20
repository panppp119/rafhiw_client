import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: require('./ui').default,
    info: require('./info').default,

    auth: require('./auth').default,
    categories: require('./categories').default,
    sub_categories: require('./sub_categories').default,
    events: require('./events').default,
    user: require('./user').default,
    addresses: require('./addresses').default,
    cards: require('./cards').default,
  });

export default rootReducer;
