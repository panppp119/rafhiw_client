import { fromJS } from 'immutable';

import * as CONST from 'constants/addresses';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const addressesReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_ADDRESSES:
    case CONST.CREATE_ADDRESS:
    case CONST.DELETE_ADDRESS:
      return state.set('loading', true);

    case CONST.FETCH_ADDRESSES_SUCCEEDED:
    case CONST.CREATE_ADDRESS_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.DELETE_ADDRESS_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('collection', fromJS([]));

    default:
      return state;
  }
};

export default addressesReducer;
