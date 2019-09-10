import * as CONST from 'constants/events';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchEvents = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;

  dispatch({ type: CONST.FETCH_EVENTS, schema });

  return request
    .get(url)
    .then(response => {
      dispatch({
        type: CONST.FETCH_EVENTS_SUCCEEDED,
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

export const fetchMyEvents = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/me`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_EVENTS, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.FETCH_EVENTS_SUCCEEDED,
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

export const fetchEvent = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.FETCH_EVENT, schema });

  return request
    .get(url)
    .then(response => {
      dispatch({
        type: CONST.FETCH_EVENT_SUCCEEDED,
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

export const createEvent = (body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const event = body;
  const attachment = body.attachment;

  console.log(body)

  dispatch({ type: CONST.CREATE_EVENT, schema });

  return request
    .post(url)
    .attach('image', attachment.file)
    .field(event)
    .then(response => {
      dispatch({
        type: CONST.CREATE_EVENT_SUCCEEDED,
        response,
        schema
      });
      dispatch(fetchEvents(schema));

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

export const updateEvent = (id, body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.UPDATE_EVENT, schema });

  return request
    .get(url)
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_EVENT_SUCCEEDED,
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
