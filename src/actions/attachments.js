import * as CONST from 'constants/attachments';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const createAttachment = (id, attachments, key, schema, type) => (
  dispatch,
  getState
) => {
  const type = schema._key;
  const url = `/${type}`;

  dispatch({ type: CONST.CREATE_ATTACHMENT, schema });

  const req = request.post(url);

  attachments.forEach(attachment => {
    req
      .attach('image', attachment.file)
      .field('type', key)
      .field('ref_id', id);
  });

  return req
    .then(response => {
      dispatch({
        type: CONST.CREATE_ATTACHMENT_SUCCEEDED,
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

export const updateAttachment = (id, body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.UPDATE_ATTACHMENT, schema });

  return request
    .put(url)
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ATTACHMENT_SUCCEEDED,
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

export const deleteAttachment = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.DELETE_ATTACHMENT, schema });

  return request
    .get(url)
    .then(response => {
      dispatch({
        type: CONST.DELETE_ATTACHMENT_SUCCEEDED,
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
