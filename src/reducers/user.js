import { fromJS } from 'immutable';

import * as CONST from 'constants/user';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const usersReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_USER:
    case CONST.UPDATE_USER:
    case CONST.REQUEST_SELLER:
      return state.set('loading', true);

    case CONST.FETCH_USER_SUCCEEDED:
    case CONST.UPDATE_USER_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case CONST.REQUEST_SELLER_SUCCEEDED:
      return state
        .set('requestSeller', fromJS(response.body))
        .set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('data', fromJS({})).set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    default:
      return state;
  }
};

export default usersReducer;
