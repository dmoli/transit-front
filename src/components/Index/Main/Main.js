import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PulseLoader } from 'react-spinners';

import Header from '../../App/Header';
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
      this.setState({ loadingNextPage: false });
    } catch (e) {
      // error
      this.setState({ errorNextPage: e.message });
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
    const {
      routes,
      favourites,
      error,
      onClickToggleFavorite,
      onClickCurrent,
    } = this.props;

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
        <ContainerInfo>
          <ContainerOptions>
            <Header />
            <CurrentName>
              {
                routes.current !== null && (
                  <FormattedMessage
                    id='routes.lablelRouteName'
                    defaultMessage='Recorrido'>
                    {txt => (<ErrorName>{`${txt} ${routes.current}`}</ErrorName>)}
                  </FormattedMessage>
                )
              }
            </CurrentName>
            <ContainerSearch></ContainerSearch>
            <ContainerTabs>
              <Tabs
                selected={currentTabName}
                onChangeTab={this.handleTabName}
              />
            </ContainerTabs>
          </ContainerOptions>
          <ContainerResults show={currentTabName === 'routes'}>
            <RoutesList
              items={routes.entities}
              onClickToggleFavorite={onClickToggleFavorite}
              onClickCurrent={onClickCurrent}
            />
          </ContainerResults>
          <ContainerResults show={currentTabName === 'favourites'}>
            <FavouritesList
              items={favourites.entities}
              onClickToggleFavorite={onClickToggleFavorite}
              onClickCurrent={onClickCurrent}
            />
          </ContainerResults>
        </ContainerInfo>
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
  /** favourites object */
  favourites: PropTypes.object.isRequired,
  /** function - active/desactive a favourite */
  onClickToggleFavorite: PropTypes.func.isRequired,
  /** function - active/desactive a current */
  onClickCurrent: PropTypes.func.isRequired,
  // /** acción siguiente página */
  // onNextPage: PropTypes.func.isRequired,
};


const ContainerMain = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
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
  width: 50%;
  height: 100vh;
  @media all and (max-width: 704px) {
    order: 1;
  }
`;

const ContainerInfo = styled.section`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media all and (max-width: 704px) {
    order: 2;
  }
`;

const ContainerOptions = styled.section`
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
`;

const ContainerSearch = styled.section`
  width: 100%;
  background-color: #f00;
  min-height: 40px;
`;

const CurrentName = styled.section`
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 18px;
`;

const ContainerTabs = styled.section`
  width: 100%;
  background-color: #f0f;
  display: flex;
  flex-flow: column-reverse;
`;

const ContainerResults = styled.section`
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  max-height: 100%;
  ${props => props.show === true && `
    display: block;
  `}
  ${props => props.show === false && `
    display: none;
  `}
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
