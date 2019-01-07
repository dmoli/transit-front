import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import initialState from './state';

/**
 * Reducer del estado del UI
 *
 * @param state estado UI
 * @param action cambiar estados UI
 */
const uiReducer = (state = initialState.ui, action = {}) => {
  switch (action.type) {
    case 'SHOW_MENU':
      return Object.assign({}, state, {
        showMenu: true,
      });
    case 'CLOSE_MENU':
      return Object.assign({}, state, {
        showMenu: false,
      });

    default:
      return state;
  }
};


const reducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
});

export default reducer;
