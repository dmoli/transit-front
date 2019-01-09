import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PulseLoader } from 'react-spinners';

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
      /** error next page */
      errorNextPage: null,
      /** loading next page */
      loadingNextPage: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleTabName = this.handleTabName.bind(this);
  }

  /**
   * After mount, listen scroll
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * Before mount, leave to listen scroll
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * When there scroll this function is called
   */
  async handleScroll() {
    try {
      const { routes, error } = this.props;
      const { loadingNextPage } = this.state;
      // stop when init loading
      if (routes.entities.length === 0 && error === null) {
        return;
      }

      // stop if exist error
      if (error !== null) {
        return;
      }

      // stop if the next results has been called
      if (loadingNextPage === true) return;

      // get webpage objects
      const body = document.body;
      const html = document.documentElement;
      // dinamic value of the scroll y
      const scrolled = window.scrollY;
      // fix value of the user visual
      const viewportHeight = window.innerHeight;
      // dinamic value of the height that is taken in the page
      const fullHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      // dispatch the scroll when the scroll is in "x" px from the bottom
      const triggerScroll = 200;
      // when scrolled + viewportHeight is greater or equal to fullHeight, then dispatch the search
      if (!(scrolled + viewportHeight + triggerScroll >= fullHeight)) {
        return;
      }

      this.setState({ loadingNextPage: true });
      // search next page datas
      // await onNextPage();
      console.log('onNextPage');
      this.setState({ loadingNextPage: false });
    } catch (e) {
      // error
      this.setState({ errorNextPage: e.message });
    }
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
   * Handle tabs behavior
   *
  * @param {string} tabName tab name
   */
  handleTabName(tabName) {
    this.setState({ currentTabName: tabName });
  }

  /**
   * Render loading
   *
   * @return component
   */
  renderLoading() {
    return (
      <ContainerLoading>
        <PulseLoader
          size={21}
          color={'#41a2c7'}
          loading={true}
        />
      </ContainerLoading>
    );
  }

  /**
   * Render error
   *
   * @return component
   */
  renderError() {
    return (
      <ContainerError>
        <FormattedMessage
          id='routes.error'
          defaultMessage='Cargando...'>
          {txt => (<ErrorName>{txt}</ErrorName>)}
        </FormattedMessage>
      </ContainerError>
    );
  }

  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };
    const { currentTabName } = this.state;
    const { routes, error } = this.props;

    // if not exist entities and not exit error, then is loading
    if (routes.entities.length === 0 && error === null) {
      return this.renderLoading();
    }

    // if exist error
    if (error !== null) {
      return this.renderError(error);
    }

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
                items={routes.entities}
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

Main.defaultProps = {
  error: null,
};

Main.propTypes = {
  /** error */
  error: PropTypes.string,
  /** routes object */
  routes: PropTypes.object.isRequired,
  /** función unfavorite */
  // onClickUnfavorite: PropTypes.func.isRequired,
  // /** acción siguiente página */
  // onNextPage: PropTypes.func.isRequired,
};


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

const ContainerLoading = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  font-weight: bold;
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

const ContainerError = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 30px 0px;
  font-weight: bold;
`;

const ErrorName = styled.span``;

export default Main;
