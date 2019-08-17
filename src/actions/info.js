import request from 'utils/request';

import * as CONST from 'constants/info'

import { addFlashMessage } from './ui';

export const fetchDisabilities = data => (dispatch, getState) => {
  dispatch({ type: CONST.FETCH_DISABILITIES });

  return request
    .get('/disabilities')
    .send(data)
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      } else {
        dispatch({ type: CONST.FETCH_DISABILITIES_SUCCEEDED, response });
      }
    })
    .catch(error => {
      dispatch(
        addFlashMessage({
          type: 'error',
          text: error.message
        })
      );
    });
};

export const fetchRoles = data => (dispatch, getState) => {
  dispatch({ type: CONST.FETCH_DISABILITIES });

  return request
    .get('/roles')
    .send(data)
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      } else {
        dispatch({ type: CONST.FETCH_DISABILITIES_SUCCEEDED, response });
      }
    })
    .catch(error => {
      dispatch(
        addFlashMessage({
          type: 'error',
          text: error.message
        })
      );
    });
};
