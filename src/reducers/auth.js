import { fromJS } from 'immutable';

import * as CONST from 'constants/auth';
import { ADD_FLASH_MESSAGE } from 'constants/ui';

const initialState = fromJS({});

export default (
  state = initialState,
  { type, response, error, auth, provider }
) => {
  switch (type) {
    case CONST.OAUTH:
    case CONST.SIGN_IN:
    case CONST.SIGN_UP:
    case CONST.SIGN_OUT:
      return state.set('loading', true);

    case CONST.SIGN_IN_SUCCEEDED:
    case CONST.SIGN_UP_SUCCEEDED:
      return state
        .set('access_token', fromJS(auth.token))
        .set('provider', fromJS(auth.provider))
        .set('loading', false);

    case CONST.SIGN_OUT_SUCCEEDED:
      return state
        .set('loading', false)
        .set('access_token', fromJS({}))
        .set('provider', fromJS({}));

    case CONST.CHECK_SESSION:
      if (auth) {
        return state
          .set('access_token', fromJS(auth.token))
          .set('provider', fromJS(auth.provider))
          .set('loading', false)
      } else {
        return state;
      }

    case CONST.OAUTH_SUCCEEDED:
    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    default:
      return state;
  }
};
