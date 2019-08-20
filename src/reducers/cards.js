import { fromJS } from 'immutable';

import * as CONST from 'constants/cards';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const cardsReducer = (
  state = initialState,
  { type, schema, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_CARDS:
    case CONST.CREATE_CARD:
    case CONST.DELETE_CARD:
      return state.set('loading', true);

    case CONST.FETCH_CARDS_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.CREATE_CARD_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.DELETE_CARD_SUCCEEDED:
      return state.set('collection', fromJS(response.body))
                  .set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('collection', fromJS([])).set('data', fromJS({}));

    default:
      return state;
  }
};

export default cardsReducer;
