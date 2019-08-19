import { fromJS } from 'immutable';

import * as CONST from 'constants/products';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const productsReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_PRODUCTS:
    case CONST.FETCH_PRODUCT:
    case CONST.CREATE_PRODUCT:
    case CONST.UPDATE_PRODUCT:
    case CONST.DELETE_PRODUCT:
    case CONST.SEARCH_PRODUCTS:
      return state.set('loading', true);

    case CONST.FETCH_PRODUCTS_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.SEARCH_PRODUCTS_SUCCEEDED:
      return state.set('search', fromJS(response.body)).set('loading', false);

    case CONST.FETCH_PRODUCT_SUCCEEDED:
    case CONST.CREATE_PRODUCT_SUCCEEDED:
    case CONST.UPDATE_PRODUCT_SUCCEEDED:
      return state.set('data', fromJS(response.body[0])).set('loading', false);

    case CONST.DELETE_PRODUCT_SUCCEEDED:
      return state
        .set('data', fromJS({}))
        .set('search', fromJS([]))
        .set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state
        .set('collection', fromJS([]))
        .set('data', fromJS({}))
        .set('search', fromJS([]));

    default:
      return state;
  }
};

export default productsReducer;
