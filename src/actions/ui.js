import * as CONST from 'constants/ui';

export const addFlashMessage = message => (dispatch, getState) => {
  dispatch({ type: CONST.ADD_FLASH_MESSAGE, message });

  setTimeout(() => {
    dispatch(removeFlashMessage());
  }, 5000);
};

export const removeFlashMessage = () => (dispatch, getState) => {
  dispatch({ type: CONST.REMOVE_FLASH_MESSAGE });
};

export const setTheme = themeColor => dispatch => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', themeColor);
  }

  dispatch({
    type: CONST.UPDATE_THEME,
    themeColor
  });
};

export const setFontSize = age => dispatch => {
  var ageClass = 'age-first';

  if (age !== 'a few seconds' && (parseInt(age) < 26 && parseInt(age) > 0)) {
    ageClass = 'age-first';
  } else if (
    age !== 'a few seconds' &&
    (parseInt(age) > 25 && parseInt(age) < 40)
  ) {
    ageClass = 'age-second';
  } else if (age !== 'a few seconds' && parseInt(age) > 40) {
    ageClass = 'age-third';
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('font', ageClass);
  }

  dispatch({ type: CONST.UPDATE_FONT_SIZE, ageClass });
};
