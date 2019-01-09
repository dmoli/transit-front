import { combineReducers } from 'redux';

import routesReducer from '../components/Index/redux/reducer';

const reducer = combineReducers({
  routes: routesReducer,
});

export default reducer;
