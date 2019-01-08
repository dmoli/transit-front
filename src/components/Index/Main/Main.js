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
    this.setState({ routes });
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
   * Handle tabs behavior
   *
  * @param tabName tab name
   */
  handleTabName(tabName) {
    this.setState({ currentTabName: tabName });
  }

  /**
   * Handle favourite behavior
   *
  * @param item item route
   */
  handleFavourites(item) {
    console.log('item', item);
  }

  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };
    const { currentTabName, routes } = this.state;
    return (
      <ContainerMain>
        <ContainerMap>
          <Map
            center={center}
            markers={[]}
            zoomCustom={10}
          />
        </ContainerMap>
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
                items={[]}
                onClickToggleFavorite={this.handleFavourites}
              />
            )
          }
        </ContainerResults>
      </ContainerMain>
    );
  }
}

const ContainerMain = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  /* padding-top: 64px; */
  @media all and (max-width: 704px) {
    flex-direction: row;
  }
`;

const ContainerMap = styled.section`
  width: 100%;
  height: 50vh;
  @media all and (max-width: 704px) {
    order: 2;
  }
`;

const ContainerResults = styled.section`
  width: 100%;
  height: 50vh;
  background: #ff0;
  @media all and (max-width: 704px) {
    order: 1;
  }
`;

export default Main;
