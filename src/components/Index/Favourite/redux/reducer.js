import { combineReducers } from 'redux';

import initialState from '../../../../redux/state';
import { actionTypes } from './actions';

/**
 * Entities reducer
 *
 * @param {array} state list of entities
 * @param action action to do
 */
const entitiesReducer = (state = initialState.favourites.entities, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_FAVOURITE:
      return action.payload;
    default:
      return state;
  }
};


const reducer = combineReducers({
  entities: entitiesReducer,
});

export default reducer;
