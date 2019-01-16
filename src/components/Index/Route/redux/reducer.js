import { combineReducers } from 'redux';

import initialState from '../../../../redux/state';
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
      return action.payload.entities;
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
      return action.payload.page;
    case actionTypes.SET_NEXT_PAGE_ROUTES:
      return state + 1;
    default:
      return state;
  }
};

/**
 * Current name reducer
 *
 * @param {array} state current name
 * @param action change name
 */
const currentReducer = (state = initialState.routes.current, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT:
      return action.payload;
    default:
      return state;
  }
};

/**
 * Shapes reducer
 *
 * @param {array} state list of shapes
 * @param action action to do
 */
const shapesReducer = (state = initialState.routes.shapes, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_SHAPES:
      return action.payload;
    default:
      return state;
  }
};


const reducer = combineReducers({
  entities: entitiesReducer,
  page: pageReducer,
  current: currentReducer,
  shapes: shapesReducer,
});

export default reducer;
