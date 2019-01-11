/* eslint no-unused-vars: [0] */
/* global API_URL */
import fetch from 'isomorphic-fetch';

const headers = () => ({
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
});

/**
 * Get entities
 *
 * @param {int} page pagination
 * @return server response
 */
export const get = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}/route/search`, {
      headers: headers(),
      method: 'get',
    });
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * Get shapes
 *
 * @param {int} routeId route id
 * @return server response
 */
export const getShapes = async (routeId) => {
  try {
    const response = await fetch(`${API_URL}/route/shapes/${routeId}`, {
      headers: headers(),
      method: 'get',
    });
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};
