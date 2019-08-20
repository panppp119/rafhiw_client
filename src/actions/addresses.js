import * as CONST from 'constants/addresses';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchAddresses = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_ADDRESSES, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      } else {
        dispatch({
          type: CONST.FETCH_ADDRESSES_SUCCEEDED,
          response,
          schema
        });
      }
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

export const createAddress = (data, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.CREATE_ADDRESS, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({
        type: CONST.CREATE_ADDRESS_SUCCEEDED,
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

export const deleteAddress = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.DELETE_ADDRESS, schema });

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.DELETE_ADDRESS_SUCCEEDED,
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
