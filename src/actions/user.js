import * as CONST from 'constants/user';
import request from 'utils/request';

import { addFlashMessage } from './ui';
import { signout } from './auth';

export const fetchUser = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_USER, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      if (response.body.error && response.body.error === 'Token is not valid or expired.') {
        dispatch(signout())
        console.log(1)
      }
      else {
        console.log(2)
        dispatch({
          type: CONST.FETCH_USER_SUCCEEDED,
          response,
          schema
        });
      }
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

export const updateUser = (body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_USER, schema });

  return request
    .put(url)
    .accessToken(accessToken)
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_USER_SUCCEEDED,
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

export const requestRole = (data, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/roles`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.REQUEST_SELLER, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({
        type: CONST.REQUEST_SELLER_SUCCEEDED,
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

export const fetchRequestRole = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/roles`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.REQUEST_SELLER, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.REQUEST_SELLER_SUCCEEDED,
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
