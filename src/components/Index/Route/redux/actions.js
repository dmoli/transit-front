/* eslint no-restricted-syntax: [0] */
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
 * @param {int} page optional number page
 * @return action to dispatch
 */
export const set = (entities, page = 1) => ({
  type: actionTypes.SET_ROUTES,
  payload: {
    entities,
    page,
  },
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
 * Verify if a route exist in favourites
 *
 * @param {array} routes entities
 * @param {array} favourites entities
 * @return {array} entities seted
 */
const setFavoriteState = (routes, favourites) => {
  const setedRoutes = JSON.parse(JSON.stringify(routes));
  const setedFavourites = JSON.parse(JSON.stringify(favourites));
  let i = 0;
  for (const routeItem of setedRoutes) {
    for (const favouriteItem of setedFavourites) {
      if (routeItem.id === favouriteItem.id) {
        const routeSetedItem = routeItem;
        routeSetedItem.favorited = true;
        setedRoutes[i] = routeSetedItem;
      }
    }
    i += 1;
  }
  return setedRoutes;
};

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
    dispatch(set(routesSeted, state.routes.page));

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
export const get = (text = '', page = null) => (
  async (dispatch, getState) => {
    try {
      const state = getState();
      const pageToSearch = page === null ? state.routes.page : page;
      // get response - API
      const response = await api.get(pageToSearch, text);
      if (response.status !== 200) {
        throw new Error('error');
      }

      // response to json
      const data = await response.json();
      // verify if a route exist in favourites
      const dataSeted = setFavoriteState(data, state.favourites.entities);
      // dispatch action
      dispatch(set(dataSeted));
      // if not exist
      if (dataSeted.length === 0) {
        throw new Error('empty');
      }

      return dataSeted;
    } catch (e) {
      // error
      throw new Error(e.message);
    }
  }
);

/**
 * Get next page of entities - API
 *
 * @param {string} text text to search
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const getNextPage = (text = '') => (
  async (dispatch, getState) => {
    try {
      const state = getState();
      // get response - API
      const response = await api.get(state.routes.page + 1, text);
      if (response.status !== 200) {
        throw new Error('error');
      }

      // response to json
      const data = await response.json();
      // if not exist
      if (data.length === 0) {
        throw new Error('empty');
      }

      // dispatch action
      dispatch(setNextPage(data));

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
