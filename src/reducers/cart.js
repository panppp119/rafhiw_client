import { fromJS } from 'immutable';

import * as CONST from 'constants/cart';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({
  cartProducts: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartProducts')) : fromJS([])
});

const cartReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_CART:
    case CONST.CREATE_CART:
    case CONST.UPDATE_CART:
    case CONST.DELETE_CART:
      return state.set('loading', true);

    case CONST.FETCH_CART_SUCCEEDED:
    case CONST.CREATE_CART_SUCCEEDED:
    case CONST.UPDATE_CART_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case CONST.DELETE_CART_SUCCEEDED:
      return state.set('data', fromJS({})).set('loading', false);

    case CONST.FETCH_CART_FAIL:
    case CONST.CREATE_CART_FAIL:
    case CONST.UPDATE_CART_FAIL:
    case CONST.DELETE_CART_FAIL:
      return state.set('error', error).set('loading', false);

    case CONST.UPDATE_CART_PRODUCTS:
      return state
        .setIn(['cartProducts', 'products'], response.products)
        .setIn(['cartProducts', 'totalQuantity'], response.totalQuantity);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      typeof window !== 'undefined' && localStorage.removeItem('cartProducts');

      return state.set('data', fromJS({})).set('cartProducts', fromJS([]));

    default:
      return state;
  }
};

export default cartReducer;
