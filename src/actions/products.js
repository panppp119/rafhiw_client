import * as CONST from 'constants/products';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchProducts = (schema, query) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;

  dispatch({ type: CONST.FETCH_PRODUCTS, schema });

  return request
    .get(url)
    .query(query)
    .then(response => {
      dispatch({
        type: CONST.FETCH_PRODUCTS_SUCCEEDED,
        response,
        schema
      });

      return response
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

export const fetchMyProducts = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/me`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_PRODUCTS, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.FETCH_PRODUCTS_SUCCEEDED,
        response,
        schema
      });

      return response
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

export const fetchProduct = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.FETCH_PRODUCT, schema });

  return request
    .get(url)
    .then(response => {
      dispatch({
        type: CONST.FETCH_PRODUCT_SUCCEEDED,
        response,
        schema
      });

      return response
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

export const createProduct = (product, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;

  dispatch({ type: CONST.CREATE_PRODUCT, schema });

  return request
    .post(url)
    .send(product)
    .then(response => {
      dispatch({
        type: CONST.CREATE_PRODUCT_SUCCEEDED,
        response,
        schema
      });

      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'เพิ่มสินค้าสำเร็จ'
        })
      );

      return response
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

export const updateProduct = (id, body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.UPDATE_PRODUCT, schema });

  return request
    .put(url)
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_PRODUCT_SUCCEEDED,
        response,
        schema
      });
      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'อัพเดตสินค้าสำเร็จ'
        })
      );

      return response
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

export const deleteProduct = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.DELETE_PRODUCT, schema });

  return request
    .del(url)
    .then(response => {
      dispatch({
        type: CONST.DELETE_PRODUCT_SUCCEEDED,
        response,
        schema
      });
      dispatch(
        addFlashMessage({
          type: 'success',
          text: 'ลบสินค้าสำเร็จ'
        })
      );

      return response
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
