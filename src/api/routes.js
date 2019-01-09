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
    const response = await fetch(`${API_URL}/transit/routes.json`, {
      headers: headers(),
      method: 'get',
    });
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getByName = async (name = '') => {

};