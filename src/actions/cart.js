import * as CONST from 'constants/cart';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const updateCartProducts = cartProducts => (dispatch, getState) => {
  localStorage.setItem(
    'cartProducts',
    JSON.stringify({
      products: cartProducts.products,
      totalQuantity: cartProducts.totalQuantity
    })
  );

  const response = cartProducts;

  dispatch({ type: CONST.UPDATE_CART_PRODUCTS, response });
};

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

      localStorage.setItem(
        'cartProducts',
        JSON.stringify({
          products: response.body.products,
          totalQuantity: response.body.total_quantity
        })
      );

      dispatch(
        updateCartProducts({
          products: response.body.products,
          totalQuantity: response.body.total_quantity
        })
      );

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

  console.log(id, cartProducts)

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
      dispatch(updateCartProducts(cartProducts));

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
