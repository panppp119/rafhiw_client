import { fromJS } from 'immutable';

import * as CONST from 'constants/orders';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const ordersReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_ORDERS:
    case CONST.FETCH_ORDER:
    case CONST.CREATE_ORDER:
    case CONST.UPDATE_ORDER:
    case CONST.CANCEL_ORDER:
      return state.set('loading', true);

    case CONST.FETCH_ORDERS_SUCCEEDED:
    case CONST.UPDATE_ORDER_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.FETCH_ORDER_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case CONST.CREATE_ORDER_SUCCEEDED:
      return state.set('id', response.body).set('loading', false);

    case CONST.CANCEL_ORDER_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('data', fromJS({}))
        .set('id', undefined)
        .set('loading', false);

    case CONST.UPDATE_ORDER_ID:
      return state.set('id', value);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('collection', fromJS([])).set('data', fromJS({}));

    default:
      return state;
  }
};

export default ordersReducer;
