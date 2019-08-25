import * as CONST from 'constants/cart';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchCart = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_CART, schema });

  const req = request.get(url);

  if (accessToken !== '') {
    req.accessToken(accessToken);
  }

  return req
    .then(response => {
      dispatch({
        type: CONST.FETCH_CART_SUCCEEDED,
        response,
        schema
      });

      return response;
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

export const createCart = (body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.CREATE_CART, schema });

  const req = request.post(url);

  if (accessToken !== '') {
    req.accessToken(accessToken);
  }

  return req
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.CREATE_CART_SUCCEEDED,
        response,
        schema
      });

      return response;
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

export const updateCart = (id, cartProducts, schema) => (
  dispatch,
  getState
) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_CART, schema });

  const req = request.put(url);

  if (accessToken !== '') {
    req.accessToken(accessToken);
  }

  return req
    .send({ id, cartProducts })
    .then(response => {
      dispatch({
        type: CONST.UPDATE_CART_SUCCEEDED,
        response,
        schema
      });

      return response;
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

export const removeProduct = (id, body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_CART, schema });

  const req = request.patch(url);

  if (accessToken !== '') {
    req.accessToken(accessToken);
  }

  return req
    .send({ id, cartProduct: body })
    .then(response => {
      dispatch({
        type: CONST.UPDATE_CART_SUCCEEDED,
        response,
        schema
      });

      return response;
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
