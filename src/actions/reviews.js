import * as CONST from 'constants/reviews';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchReviews = (body, schema, options = {}) => (
  dispatch,
  getState
) => {
  const type = options.type || schema._key;
  const url = options.url || `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_REVIEWS, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .query(body)
    .then(response => {
      dispatch({
        type: CONST.FETCH_REVIEWS_SUCCEEDED,
        response,
        schema
      });
    })
    .catch(error => {
      console.warn(error.message);

      dispatch(
        addFlashMessage({
          type: 'error',
          text: error.message
        })
      );
    });
};

export const createReview = (data, schema, options = {}) => (
  dispatch,
  getState
) => {
  const type = options.type || schema._key;
  const url = options.url || `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.CREATE_REVIEW, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({
        type: CONST.CREATE_REVIEW_SUCCEEDED,
        response,
        schema
      });
    })
    .catch(error => {
      console.warn(error.message);

      dispatch(
        addFlashMessage({
          type: 'error',
          text: error.message
        })
      );
    });
};
