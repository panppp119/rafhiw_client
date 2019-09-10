import request from 'utils/request';
import { push } from 'react-router-redux';

import * as CONST from 'constants/auth';
import firebase from 'utils/configFirebase';
import userSchema from 'schemas/user';

import { addFlashMessage } from './ui';
import { fetchUser } from './user';

const auth = firebase.auth();

export const oauth = provider => (dispatch, getState) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  dispatch({ type: CONST.OAUTH });

  auth
    .signInWithPopup(googleProvider)
    .then(response => {
      const userInfo = response.additionalUserInfo;
      const profile = userInfo.profile;

      const user = {
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        provider,
        uid: response.user.uid,
        image: profile.picture || 'https://rafhiw.com/uploads/default.png'
      };

      dispatch({ type: CONST.OAUTH_SUCCEEDED });

      if (userInfo.isNewUser && provider === 'google') {
        dispatch(register(user));
      } else {
        dispatch(signin({ email: profile.email, provider }));
      }

      return response
    })
    .catch(() => {
      dispatch(
        addFlashMessage({
          type: 'error',
          text: 'มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง'
        })
      );
    });
};

export const signin = data => (dispatch, getState) => {
  dispatch({ type: CONST.SIGN_IN });

  return request
    .post('/sign_in')
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
        const provider = data.provider || 'email';
        const authen = {
          token: response.body.access_token,
          provider
        };

        sessionStorage.setItem('auth', JSON.stringify(authen));

        dispatch({ type: CONST.SIGN_IN_SUCCEEDED, auth: authen });
        dispatch(push('/'));
        dispatch(fetchUser(userSchema))
        dispatch(
          addFlashMessage({
            type: 'success',
            text: `ยินดีต้อนรับ`
          })
        );
      }

      return response
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

export const register = data => (dispatch, getState) => {
  dispatch({ type: CONST.SIGN_UP });

  return request
    .post('/register')
    .send(data)
    .then(response => {
      const provider = data.provider;
      const authen = {
        token: response.body.access_token,
        provider
      };

      sessionStorage.setItem('auth', JSON.stringify(authen));

      dispatch({ type: CONST.SIGN_UP_SUCCEEDED, auth: authen });
      dispatch(push('/'));

      return response
    })
    .catch(error => {
      dispatch(
        addFlashMessage({
          type: 'error',
          text: error
        })
      );
    });
};

export const signout = () => (dispatch, getState) => {
  // const location = getState().getIn(['router', 'location', 'pathname']);

  dispatch({ type: CONST.SIGN_OUT });

  if (getState().getIn(['auth', 'provider']) === 'google') {
    auth.signOut();
  }

  return request.post('/sign_out').then(response => {
    sessionStorage.removeItem('auth');

    dispatch({ type: CONST.SIGN_OUT_SUCCEEDED });
    dispatch(push('/'))
  });
};

export const checkSession = () => (dispatch, getState) => {
  const authen = JSON.parse(sessionStorage.getItem('auth'));
  // const pathname = getState().getIn(['router', 'location', 'pathname'], '');
  dispatch({ type: CONST.CHECK_SESSION, auth: authen });

  if (authen && authen.token !== null) {
    authen.provider !== 'email' && auth.onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(fetchUser(userSchema));
      }
    })
  } else {
    dispatch({ type: CONST.CHECK_SESSION });
  }
};
