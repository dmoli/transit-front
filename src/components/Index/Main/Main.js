/* eslint no-return-assign: [0] */
/* eslint no-unused-vars: [0] */
/* global API_URL */
import React, { Component } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import Map from '../../Elements/Map';
import Tabs from '../Tabs';
import RoutesList from '../RoutesList';
import FavouritesList from '../FavouritesList';


/**
 * Main component
 */
class Main extends Component {
  constructor() {
    super();
    this.state = {
      /* current tab name */
      currentTabName: 'routes',
      /* list of routes */
      routes: [],
      /* list of favourites */
      favourites: [],
    };

    this.handleTabName = this.handleTabName.bind(this);
    this.handleFavourites = this.handleFavourites.bind(this);
  }

  /**
   * Get routes
   *
   * @return array of routes
   */
  async componentDidMount() {
    await this.handleRoutes();
  }

  /**
   * Get routes
   *
   * @return array of routes
   */
  async handleRoutes() {
    // get routes from API
    const response = await this.getRoutes();
    // transform to object a put in the state
    const routes = await response.json();
    this.setState({ routes: this.setRoute(routes) });
  }

  /**
   * Get routes from API
   *
   * @return array of routes
   */
  async getRoutes() {
    try {
      const response = await fetch(`${API_URL}/transit/routes.json`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        method: 'get',
      });
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Set routes
   *
   * @return array of routes seted
   */
  setRoute(routes) {
    // get routes from API
    const setedRoutes = routes;
    setedRoutes.forEach((entity, i) => {
      const entitySeted = entity;
      entitySeted.isFav = false;
      setedRoutes[i] = entitySeted;
    });

    return setedRoutes;
  }

  /**
   * Get routes by id
   *
   * @param {int} routeId route id
   * @param {array} routes list of routes
   * @param {string} action name of action
   * @return array of routes seted
   */
  setRouteById(routeId, routes, action) {
    // get routes from API
    const setedRoutes = routes;
    let i = 0;
    for (const entity of setedRoutes) {
      if (routeId === entity.route_id) {
        const entitySeted = entity;
        // action to favorite
        if (action === 'fav') entitySeted.isFav = true;
        // action to unfavorite
        if (action === 'unfav') entitySeted.isFav = false;
        setedRoutes[i] = entitySeted;
        break;
      }
      i += 1;
    }
    return setedRoutes;
  }

  /**
   * Handle tabs behavior
   *
  * @param {string} tabName tab name
   */
  handleTabName(tabName) {
    this.setState({ currentTabName: tabName });
  }

  /**
   * Handle favourite actions
   *
   * @param {int} routeId route id
   * @param {string} action action name, favourite or unfavourite
   * @return array of routes seted
   */
  handleFavourites(routeId, action) {
    // create a deep copy of routes to keep immutability
    const { routes } = JSON.parse(JSON.stringify(this.state));
    // create a deep copy of routes to keep immutability
    const { favourites } = JSON.parse(JSON.stringify(this.state));
    // set favourite field and set state to refresh
    this.setState({ routes: this.setRouteById(routeId, routes, action) });
    // set favourites list
    if (action === 'fav') {
      this.setState({ favourites: this.setFavourites(routeId, favourites, 'add') });
    } else {
      this.setState({ favourites: this.setFavourites(routeId, favourites, 'remove') });
    }
  }

  /**
   * Get routes by id
   *
   * @param {int} routeId route id
   * @param {array} favourites list of favourites
   * @param {string} action name of action
   * @return array of favourites seted
   */
  setFavourites(routeId, favourites, action) {
    // get routes from API
    // const setedFavourites = favourites;
    // let i = 0;
    // let exist = true;
    // for (const entity of setedFavourites) {
    //   if (routeId === entity.route_id) {
    //     const entitySeted = entity;
    //     // action to unfavorite
    //     if (action === 'unfav') delete setedFavourites[i];
    //     setedFavourites[i] = entitySeted;
    //     break;
    //   }
    //   i += 1;
    // }

    // if (exist !=== false) {
    //   // action to favorite
    //   if (action === 'fav') setedFavourites.push(entity);
    // }
    // return setedFavourites;
  }


  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };
    const { currentTabName, routes, favourites } = this.state;
    return (
      <ContainerMain>
        <ContainerResults>
          <Tabs
            selected={currentTabName}
            onChangeTab={this.handleTabName}
          />
          {
            currentTabName === 'routes' && (
              <RoutesList
                items={routes}
                onClickToggleFavorite={this.handleFavourites}
              />
            )
          }
          {
            currentTabName === 'favourites' && (
              <FavouritesList
                items={favourites}
                onClickToggleFavorite={this.handleFavourites}
              />
            )
          }
        </ContainerResults>
        <ContainerMap>
          <Map
            center={center}
            markers={[]}
            zoomCustom={10}
          />
        </ContainerMap>
      </ContainerMain>
    );
  }
}

const ContainerMain = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  @media all and (max-width: 704px) {
    flex-direction: column;
  }
`;

const ContainerMap = styled.section`
  width: 100%;
  height: 50vh;
  @media all and (max-width: 704px) {
    order: 1;
  }
`;

const ContainerResults = styled.section`
  width: 100%;
  height: 50vh;
  @media all and (max-width: 704px) {
    order: 2;
  }
`;

export default Main;
