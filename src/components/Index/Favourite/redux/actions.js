import { set as setRoute } from '../../Route/redux/actions';

/**
 * Action types
 */
export const actionTypes = {
  /** Set */
  SET_FAVOURITE: 'SET_FAVOURITE',
};

/**
 * Modify entities
 *
 * @param {array} entities entities
 * @return action to dispatch
 */
export const set = entities => ({
  type: actionTypes.SET_FAVOURITE,
  payload: entities,
});

/**
 * Find by id
 *
 * @param {int} routeId route id
 * @param {array} routes entities
 * @return entity found
 */
const findById = (routeId, routes) => {
  const setedRoutes = JSON.parse(JSON.stringify(routes));
  let entitySeted;
  for (const entity of setedRoutes) {
    if (routeId === entity.route_id) {
      entitySeted = entity;
      break;
    }
  }
  return entitySeted;
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
  for (const entity of setedEntities) {
    if (id === entity.route_id) {
      const entitySeted = entity;
      if (action === 'fav') entitySeted.favorited = true;
      if (action === 'unfav') entitySeted.favorited = false;
      setedEntities[i] = entitySeted;
      break;
    }
    i += 1;
  }
  return setedEntities;
};

/**
 * Add favorite - Mock only
 *
 * @param {int} routeId route id
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const add = routeId => (
  async (dispatch, getState) => {
    const state = getState();
    const route = findById(routeId, state.routes.entities);
    route.favorited = true;
    const favourites = state.favourites.entities;
    favourites.push(route);
    // add this route to state
    dispatch(set(favourites));

    // refresh routes
    const routesSeted = setFields(routeId, state.routes.entities, 'fav');
    dispatch(setRoute(routesSeted));
  }
);

/**
 * Remove favorite - Mock only
 *
 * @param {int} routeId route id
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const remove = routeId => (
  async (dispatch, getState) => {
    const state = getState();
    let i = 0;
    const setedFavourites = JSON.parse(JSON.stringify(state.favourites.entities));
    // find route in favourite and remove it
    for (const entity of setedFavourites) {
      if (routeId === entity.route_id) {
        // delete setedFavourites[i];
        setedFavourites.splice(i, 1);
        break;
      }
      i += 1;
    }
    console.log('setedFavourites', setedFavourites);
    // refresh favourites
    dispatch(set(setedFavourites));

    // refresh routes
    const routesSeted = setFields(routeId, state.routes.entities, 'unfav');
    dispatch(setRoute(routesSeted));
  }
);
