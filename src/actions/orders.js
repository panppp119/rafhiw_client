import * as CONST from 'constants/orders';
import { CREATE_ATTACHMENT, CREATE_ATTACHMENT_SUCCEEDED } from 'constants/attachments'
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchOrder = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_ORDER, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.FETCH_ORDER_SUCCEEDED,
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

export const fetchOrders = schema => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_ORDERS, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.FETCH_ORDERS_SUCCEEDED,
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

export const fetchSellerOrders = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/sell`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.FETCH_ORDERS, schema });

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.FETCH_ORDERS_SUCCEEDED,
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

export const createOrder = (data, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.CREATE_ORDER, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({
        type: CONST.CREATE_ORDER_SUCCEEDED,
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

export const updateOrder = (id, body, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_ORDER, schema });

  return request
    .put(url)
    .accessToken(accessToken)
    .send(body)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ORDER_SUCCEEDED,
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

export const createTransfer = (id, body, key, schema) => (
  dispatch,
  getState
) => {
  const type = schema._key;
  const url = `/${type}/${id}/transfer`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_ORDER, schema });
  // dispatch(createAttachment(id, body, key, attachmentSchema));

  return request
    .post(url)
    .accessToken(accessToken)
    .send(key)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ORDER_SUCCEEDED,
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

export const cancelOrder = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}/cancel`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_ORDER, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ORDER_SUCCEEDED,
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

export const updateTrackingId = (id, update, schema) => (
  dispatch,
  getState
) => {
  const type = schema._key;
  const url = `/${type}/${id}/track`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_ORDER, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .send(update)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ORDER_SUCCEEDED,
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

export const comfirmProduct = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}/confirm`;
  const accessToken = getState().getIn(['auth', 'access_token']) || '';

  dispatch({ type: CONST.UPDATE_ORDER, schema });

  return request
    .post(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({
        type: CONST.UPDATE_ORDER_SUCCEEDED,
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

export const updateOrderId = (id, schema) => (dispatch, getState) => {
  dispatch({ type: CONST.UPDATE_ORDER_ID, value: id });
};

export const createAttachment = (id, attachments, schema) => (
  dispatch,
  getState
) => {
  const url = `/invoices/attachments`;

  dispatch({ type: CREATE_ATTACHMENT, schema });

  const req = request.post(url);

  attachments.forEach(attachment => {
    req
      .attach('image', attachment.file)
      .field('order_id', id)
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
