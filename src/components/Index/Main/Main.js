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
      loadNextPage: false,
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
      const { routes, error, onNextPage } = this.props;
      const { currentTabName, loadNextPage } = this.state;
      // stop if the next results has been called
      if (currentTabName === 'favourites') return;

      // stop when init loading
      if (routes.entities.length === 0 && error === null) {
        return;
      }

      // stop if exist error
      if (error !== null) {
        return;
      }

      // stop if the next results has been called
      if (loadNextPage === true) return;

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

      this.setState({ loadNextPage: true });
      // search next page datas
      await onNextPage();
      this.setState({ loadNextPage: false });
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

  // /**
  //  * Render map load
  //  *
  //  * @return component
  //  */
  // renderMapLoad() {
  //   return (
  //     <MapLoad>
  //       <Masker className='animated-background'>
  //         <MaskerHeaderTop className='background-masker' />
  //         <MaskerHeaderBottom className='background-masker' />
  //       </Masker>
  //     </MapLoad>
  //   );
  // }

  /**
   * Render next page load
   *
   * @return component
   */
  renderNextPageLoad() {
    return (
      <NextPageLoad>
        <PulseLoader
          size={21}
          color={'#4ae16e'}
          loading={true}
        />
      </NextPageLoad>
    );
  }

  /**
   * Render map load
   *
   * @return component
   */
  renderMapLoad() {
    return (
      <MapLoad>
        <PulseLoader
          size={21}
          color={'#fff'}
          loading={true}
        />
      </MapLoad>
    );
  }
  /**
   * Render map error
   *
   * @return component
   */
  renderMapError() {
    return (
      <MapLoad>
        <FormattedMessage
          id='shape.error'
          defaultMessage='No pudimos cargar el recorrido, intenta otra vez :/'>
          {txt => (<ErrorShapeName>{txt}</ErrorShapeName>)}
        </FormattedMessage>
      </MapLoad>
    );
  }

  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };
    const { currentTabName, loadNextPage } = this.state;
    const {
      routes,
      favourites,
      error,
      loadShape,
      errorShape,
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
                    id='routes.labelRouteName'
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
          { loadNextPage === true && (this.renderNextPageLoad()) }
        </ContainerInfo>
        <ContainerMap>
          { loadShape === true && (this.renderMapLoad()) }
          { errorShape === 'empty' && (this.renderMapError()) }
          <Map
            center={center}
            markers={routes.shapes}
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
  /** error get shape */
  errorShape: PropTypes.string,
  /** load get shape */
  loadShape: PropTypes.string,
  /** routes object */
  routes: PropTypes.object.isRequired,
  /** favourites object */
  favourites: PropTypes.object.isRequired,
  /** function - active/desactive a favourite */
  onClickToggleFavorite: PropTypes.func.isRequired,
  /** function - active/desactive a current */
  onClickCurrent: PropTypes.func.isRequired,
  /** acción siguiente página */
  onNextPage: PropTypes.func.isRequired,
};


const ContainerMain = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  @media all and (max-width: 768px) {
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
  position: fixed;
  right: 0;
  @media all and (max-width: 768px) {
    order: 1;
    width: 100%;
    height: 50vh;
  }
`;

const ContainerInfo = styled.section`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media all and (max-width: 768px) {
    order: 2;
    width: 100%;
    height: 50vh;
    margin-top: 50vh;
  }
`;

const ContainerOptions = styled.section`
  position: fixed;
  width: 50%;
  background: #ccc;
  z-index: 1;
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

const ContainerSearch = styled.section`
  width: 100%;
  background-color: #f00;
  display: none;
  min-height: 40px;
  @media all and (max-width: 768px) {
    display: none;
  }
`;

const CurrentName = styled.section`
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 18px;
  @media all and (max-width: 768px) {
    display: none;
  }
`;

const ContainerTabs = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column-reverse;
`;

const ContainerResults = styled.section`
  width: 100%;
  /* height: 70vh;
  overflow-y: scroll;
  max-height: 100%; */
  padding: 150px 0 0 0;
  ${props => props.show === true && `
    display: block;
  `}
  ${props => props.show === false && `
    display: none;
  `}
  @media all and (max-width: 768px) {
    padding: 50px 0 0 0;
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
const ErrorShapeName = styled.span`color: white`;

const MapLoad = styled.section`
  width: 50%;
  background: #3ba0c8bf;
  height: 100vh;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 768px) {
    width: 100%;
    height: 50vh;
  }
`;

const NextPageLoad = styled.section`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const Masker = styled.div``;
//
// const MaskerHeaderTop = styled.div`
//   top: 30px;
//   left: 0;
//   right: 0;
//   height: 13px;
// `;
//
// const MaskerHeaderBottom = styled.div`
//   top: 217px;
//   left: 0;
//   right: 0;
//   height: 13px;
// `;

export default Main;
