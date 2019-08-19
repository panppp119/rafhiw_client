import * as CONST from 'constants/categories';
import request from 'utils/request';

import { addFlashMessage } from './ui';

export const fetchCategories = (schema, query) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}`;

  dispatch({ type: CONST.FETCH_SUB_CATEGORIES, schema });

  return request
    .get(url)
    .query(query)
    .then(response => {
      dispatch({
        type: CONST.FETCH_SUB_CATEGORIES_SUCCEEDED,
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

export const fetchCategory = (id, schema) => (dispatch, getState) => {
  const type = schema._key;
  const url = `/${type}/${id}`;

  dispatch({ type: CONST.FETCH_SUB_CATEGORY, schema });

  return request
    .get(url)
    .then(response => {
      dispatch({
        type: CONST.FETCH_SUB_CATEGORY_SUCCEEDED,
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
