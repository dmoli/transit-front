import * as api from '../../../../api/routes';
import { set as setFavourite } from '../../Favourite/redux/actions';

/**
 * Action types
 */
export const actionTypes = {
  /** Set .entities */
  SET_ROUTES: 'SET_ROUTES',
  /** Set .entities && .page */
  SET_NEXT_PAGE_ROUTES: 'SET_NEXT_PAGE_ROUTES',
  /** Set .current */
  SET_CURRENT: 'SET_CURRENT',
  /** Set .shapes */
  SET_SHAPES: 'SET_SHAPES',
};

/**
 * Modify entities
 *
 * @param {array} entities entities
 * @return action to dispatch
 */
export const set = entities => ({
  type: actionTypes.SET_ROUTES,
  payload: entities,
});

/**
 * Modify entities and pagination +1
 *
 * @param {array} entities results
 * @return action to dispatch
 */
export const setNextPage = entities => ({
  type: actionTypes.SET_NEXT_PAGE_ROUTES,
  payload: entities,
});

/**
 * Modify current
 *
 * @param {string} currentName currentName
 * @return action to dispatch
 */
export const setCurrent = currentName => ({
  type: actionTypes.SET_CURRENT,
  payload: currentName,
});

/**
 * Modify shapes
 *
 * @param {array} shapes shapes
 * @return action to dispatch
 */
export const setShapes = shapes => ({
  type: actionTypes.SET_SHAPES,
  payload: shapes,
});

/**
 * Set object fields of the array by actions
 *
 * @param {int} id id of the entity
 * @param {array} entities entities
 * @param {string} action action to do
 * @return {array} setedEntities entities seted
 */
const setFields = (id, entities, action) => {
  const setedEntities = JSON.parse(JSON.stringify(entities));
  let i = 0;
  if (action === 'current') {
    for (const entity of setedEntities) {
      const entitySeted = entity;
      if (id === entity.route_id) {
        entitySeted.current = true;
      } else {
        entitySeted.current = false;
      }
      setedEntities[i] = entitySeted;
      i += 1;
    }
  }

  i = 0;
  if (action === 'init_shape') {
    for (const entity of setedEntities) {
      const entitySeted = entity;
      entitySeted.lat = parseFloat(entitySeted.shape_pt_lat);
      entitySeted.lng = parseFloat(entitySeted.shape_pt_lon);
      setedEntities[i] = entitySeted;
      i += 1;
    }
  }
  return setedEntities;
};

/**
 * Refresh current route
 *
 * @param {int} routeId route id
 * @param {string} routeName route name
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const refreshCurrent = (routeId, routeName) => (
  async (dispatch, getState) => {
    const state = getState();
    // refresh routes
    const routesSeted = setFields(routeId, state.routes.entities, 'current');
    dispatch(set(routesSeted));

    // refresh favourites
    const favouritesSeted = setFields(routeId, state.favourites.entities, 'current');
    dispatch(setFavourite(favouritesSeted));

    // refresh current field
    dispatch(setCurrent(routeName));
  }
);

/**
 * Get entities - API
 *
 * @param {string} text text to search
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const get = (text = '') => (
  async (dispatch, getState) => {
    try {
      const state = getState();
      // get response - API
      const response = await api.get(state.routes.page, text);
      if (response.status !== 200) {
        throw new Error('error');
      }

      // response to json
      const data = await response.json();
      // dispatch action
      dispatch(set(data));
      // if not exist
      if (data.length === 0) {
        throw new Error('empty');
      }

      return data;
    } catch (e) {
      // error
      throw new Error(e.message);
    }
  }
);

/**
 * Get shapes - API
 *
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const getShapes = routeId => (
  async (dispatch) => {
    try {
      // get response - API
      const response = await api.getShapes(routeId);
      if (response.status !== 200) {
        throw new Error('error');
      }

      // response to json
      const data = await response.json();
      // if not exist
      if (data.length === 0) {
        throw new Error('empty');
      }

      // set init
      const dataSeted = setFields(null, data, 'init_shape');
      // dispatch action
      dispatch(setShapes(dataSeted));

      return data;
    } catch (e) {
      // error
      throw new Error(e.message);
    }
  }
);
