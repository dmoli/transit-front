import { combineReducers } from 'redux';

import initialState from '../../../redux/state';
import { actionTypes } from './actions';

/**
 * Entities reducer
 *
 * @param {array} state list of entities
 * @param action action to do
 */
const entitiesReducer = (state = initialState.routes.entities, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_ROUTES:
      return action.payload;
    case actionTypes.SET_NEXT_PAGE_ROUTES:
      return state.concat(action.payload);
    default:
      return state;
  }
};

/**
 * Number page reducer
 *
 * @param {array} state number page
 * @param action plus +1 in the number page
 */
const pageReducer = (state = initialState.routes.page, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_ROUTES:
      return 1;
    case actionTypes.SET_NEXT_PAGE_ROUTES:
      return state + 1;
    default:
      return state;
  }
};


const reducer = combineReducers({
  entities: entitiesReducer,
  page: pageReducer,
});

export default reducer;
