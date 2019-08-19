import { fromJS } from 'immutable';

import * as CONST from 'constants/info';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth'
import { ADD_FLASH_MESSAGE } from 'constants/ui'

const initialState = fromJS({});

export default (
  state = initialState,
  { type, response, error, auth, provider }
) => {
  switch (type) {
    case CONST.FETCH_DISABILITIES:
      return state.setIn(['disabilities', 'loading'], true);

    case CONST.FETCH_ROLES:
      return state.setIn(['roles', 'loading'], true);

    case CONST.FETCH_DISABILITIES_SUCCEEDED:
      return state
        .setIn(['disabilities', 'data'], fromJS(response.body))
        .setIn(['disabilities', 'loading'], false);

    case CONST.FETCH_ROLES_SUCCEEDED:
      return state
        .setIn(['roles', 'data'], fromJS(response.body))
        .setIn(['roles', 'loading'], false);

    case SIGN_OUT_SUCCEEDED:
      return state
        .setIn(['disabilities', 'loading'], false)
        .setIn(['roles', 'loading'], false)
        .set(['disabilities', 'data'], fromJS([]))
        .set(['roles', 'data'], fromJS([]))

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    default:
      return state;
  }
};
