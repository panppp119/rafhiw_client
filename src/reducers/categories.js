import { Map, List, fromJS } from 'immutable';

import * as CONST from 'constants/categories';
import { ADD_FLASH_MESSAGE } from 'constants/ui';

const initialState = Map();

const categoriesReducer = (
  state = initialState,
  { type, schema, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_CATEGORIES:
    case CONST.FETCH_CATEGORY:
      return state.set('loading', true);

    case CONST.FETCH_CATEGORIES_SUCCEEDED:
      return state
        .set('collection', List(fromJS(response.body)))
        .set('loading', false);

    case CONST.FETCH_CATEGORY_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case ADD_FLASH_MESSAGE:
      return state.set('loading', false);

    default:
      return state;
  }
};

export default categoriesReducer;
