import * as CONST from 'constants/ui';
import { fromJS } from 'immutable';

const theme = sessionStorage.getItem('theme');
const font = sessionStorage.getItem('font');

const initialState = fromJS({
  theme: theme || 'theme-orange',
  font: font || 'age-first'
});

const uiReducer = (
  state = initialState,
  { type, themeColor, ageClass, message }
) => {
  switch (type) {
    case CONST.UPDATE_THEME:
      return state.set('theme', themeColor);

    case CONST.UPDATE_FONT_SIZE:
      return state.set('font', ageClass);

    case CONST.ADD_FLASH_MESSAGE:
      return state.set('flash_message', fromJS(message));

    case CONST.REMOVE_FLASH_MESSAGE:
      return state.set('flash_message', fromJS({}));

    default:
      return state;
  }
};

export default uiReducer;
