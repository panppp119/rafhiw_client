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
    products: require('./products').default,
    user: require('./user').default,
    addresses: require('./addresses').default,
    cards: require('./cards').default,
    bank: require('./bank').default,
    cart: require('./cart').default,
    orders: require('./orders').default,
    reviews: require('./reviews').default,
    search: require('./search').default,
  });

export default rootReducer;
