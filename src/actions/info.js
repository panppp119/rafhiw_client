import request from 'utils/request';

import * as CONST from 'constants/info'

import { addFlashMessage } from './ui';

export const fetchHighlight = () => (dispatch, getState) => {
  dispatch({ type: CONST.FETCH_HIGHLIGHT });

  return request
    .get('/highlight')
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      } else {
        dispatch({ type: CONST.FETCH_HIGHLIGHT_SUCCEEDED, response });
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

export const fetchDisabilities = () => (dispatch, getState) => {
  dispatch({ type: CONST.FETCH_DISABILITIES });

  return request
    .get('/disabilities')
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

export const fetchRoles = () => (dispatch, getState) => {
  dispatch({ type: CONST.FETCH_ROLES });

  return request
    .get('/roles')
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      } else {
        dispatch({ type: CONST.FETCH_ROLES_SUCCEEDED, response });
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
