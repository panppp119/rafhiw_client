import { fromJS } from 'immutable';

import * as CONST from 'constants/bank';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const banksReducer = (
  state = initialState,
  { type, schema, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_BANK:
    case CONST.CREATE_BANK:
    case CONST.DELETE_BANK:
      return state.set('loading', true);

    case CONST.FETCH_BANK_SUCCEEDED:
      return state
        .set('data', fromJS(response.body))
        .set('loading', false);

    case CONST.CREATE_BANK_SUCCEEDED:
      return state
        .set('data', fromJS(response.body))
        .set('loading', false);

    case CONST.DELETE_BANK_SUCCEEDED:
      return state.set('data', fromJS(response.body))
                  .set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('data', fromJS({})).set('data', fromJS({}));

    default:
      return state;
  }
};

export default banksReducer;
