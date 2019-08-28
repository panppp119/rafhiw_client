import { Map, List, fromJS } from 'immutable';

import * as CONST from 'constants/reviews';

const initialState = Map();

const reviewsReducer = (
  state = initialState,
  { type, schema, options, response, error, value }
) => {
  switch (type) {
    case CONST.FETCH_REVIEWS:
    case CONST.CREATE_REVIEW:
      return state.set('loading', true);

    case CONST.FETCH_REVIEWS_SUCCEEDED:
      return state
        .set('collection', List(fromJS(response.body)))
        .set('loading', false);

    case CONST.CREATE_REVIEW_SUCCEEDED:
      return state.set('data', fromJS(response.body)).set('loading', false);

    case CONST.FETCH_REVIEWS_FAIL:
    case CONST.CREATE_REVIEW_FAIL:
      return state.set('error', error).set('loading', false);

    default:
      return state;
  }
};

export default reviewsReducer;
