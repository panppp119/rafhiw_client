import * as CONST from 'constants/user';
import { CREATE_ATTACHMENT, CREATE_ATTACHMENT_SUCCEEDED } from 'constants/attachments'
import request from 'utils/request';

import { addFlashMessage } from './ui';

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
        dispatch(
          addFlashMessage({
            type: 'error',
            text: response.body.error
          })
        );
      }
      else {
        dispatch({
          type: CONST.FETCH_USER_SUCCEEDED,
          response,
          schema
        });
      }
    })
    .catch(error => {
      console.warn(error.message);

      // dispatch(
      //   addFlashMessage({
      //     type: 'error',
      //     text: error.message
      //   })
      // );
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

export const createAttachment = (id, attachments, schema, type) => (
  dispatch,
  getState
) => {
  const schema_type = schema._key;
  const url = `/${schema_type}/attachments`;

  dispatch({ type: CREATE_ATTACHMENT, schema });

  const req = request.post(url);

  attachments.forEach(attachment => {
    req
      .attach('image', attachment.file)
      .field('user_id', id);

    if (type){
      req.field('type', type)
    }
  });

  return req
    .then(response => {
      dispatch({
        type: CREATE_ATTACHMENT_SUCCEEDED,
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
