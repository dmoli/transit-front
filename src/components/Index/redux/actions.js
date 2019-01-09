import * as api from '../../../api/routes';

/**
 * Action types
 */
export const actionTypes = {
  /** Set .entities */
  SET_ROUTES: 'SET_ROUTES',
  /** Set .entities && .page */
  SET_NEXT_PAGE_ROUTES: 'SET_NEXT_PAGE_ROUTES',
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
 * Get entities - API
 *
 * @param {object} dispatch dispatch of actions
 * @return action to dispatch
 */
export const get = () => (
  async (dispatch) => {
    try {
      // get response - API
      const response = await api.get();
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
