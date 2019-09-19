import { fromJS } from 'immutable';

import * as CONST from 'constants/search';
import { SIGN_OUT_SUCCEEDED } from 'constants/auth';

const initialState = fromJS({});

const searchReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_SEARCH:
      return state.set('loading', true);

    case CONST.FETCH_SEARCH_SUCCEEDED:
      return state.set('collection', fromJS(response.body)).set('loading', false);

    case SIGN_OUT_SUCCEEDED:
      localStorage.removeItem('cartProducts');

      return state.set('collection', fromJS([]));

    default:
      return state;
  }
};

export default searchReducer;
