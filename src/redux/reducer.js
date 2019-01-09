import { combineReducers } from 'redux';

import routesReducer from '../components/Index/Route/redux/reducer';
import favouritesReducer from '../components/Index/Favourite/redux/reducer';

const reducer = combineReducers({
  routes: routesReducer,
  favourites: favouritesReducer,
});

export default reducer;
