import * as CONST from 'constants/search';
import request from 'utils/request';

export const fetchSearch = (body, schema) => (dispatch, getState) => {
  const url = '/search';
  const key = body.search

  dispatch({ type: CONST.FETCH_SEARCH, schema });

  if (key !== '') {
    return request
      .post(url)
      .send(body)
      .then(response => {
        dispatch({
          type: CONST.FETCH_SEARCH_SUCCEEDED,
          response,
          schema
        });

        return response
      })
      .catch(error => {
        console.warn(error.message);
      });
  }
  else {
    const response = {
      body: []
    }

    console.log(key)

    dispatch({
      type: CONST.FETCH_SEARCH_SUCCEEDED,
      response,
      schema
    });
  }
};

export const resetSearch = (schema) => (dispatch, getState) => {
  dispatch({ type: CONST.RESET_SEARCH, schema });
};
