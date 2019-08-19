import { fromJS } from 'immutable';

import * as CONST from 'constants/events';
import { ADD_FLASH_MESSAGE } from 'constants/ui';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const eventsReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_EVENTS:
    case CONST.FETCH_EVENT:
    case CONST.CREATE_EVENT:
    case CONST.UPDATE_EVENT:
      return state.set('loading', true);

    case CONST.FETCH_EVENTS_SUCCEEDED:
      return state
        .set('collection', fromJS(response.body))
        .set('loading', false);

    case CONST.FETCH_EVENT_SUCCEEDED:
    case CONST.CREATE_EVENT_SUCCEEDED:
    case CONST.UPDATE_EVENT_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      return state.set('collection', fromJS([])).set('data', fromJS({}));

    default:
      return state;
  }
};

export default eventsReducer;
