import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import {
  MdClose,
  MdSearch,
} from 'react-icons/lib/md';

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
      /** input value */
      value: '',
    };

    this.renderTabs = this.renderTabs.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleTabName = this.handleTabName.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      const { error, onNextPage } = this.props;
      const { value, errorNextPage, currentTabName, loadNextPage } = this.state;
      // stop if the tabname is favourites
      if (currentTabName === 'favourites') return;

      // stop if exist error
      if (error !== null) {
        return;
      }

      // stop if the next results is loading
      if (loadNextPage === true) return;

      // stop if the next results has been empty
      if (errorNextPage !== null) return;

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

      this.setState({
        errorNextPage: null,
        loadNextPage: true,
      });
      // search next page datas
      await onNextPage(value);
    } catch (e) {
      // error
      this.setState({ errorNextPage: e.message });
    }
    this.setState({ loadNextPage: false });
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
   * Search routes
   *
   * @param {string} text text typed
   */
  async handleChange(event) {
    const { onSearchRoutes } = this.props;
    const { currentTabName } = this.state;
    // move to scroll to top
    window.scrollTo(0, 0);
    // set input state, and error next page to null to can search again
    this.setState({
      value: event.target.value,
      errorNextPage: null,
    });
    // if search in favorite, then change tab
    if (currentTabName === 'favourites') this.setState({ currentTabName: 'routes' });
    // search next page datas
    await onSearchRoutes(event.target.value);
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
   * Render search
   *
   * @return component
   */
  renderSearch() {
    return (
      <ContainerSearch>
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder='Busca tu recorrido...'
          className='gradient-green-bg white-place-holder'
        />
        <ContainerIconSearch>
          <MdSearch size={20} className='white' />
        </ContainerIconSearch>
      </ContainerSearch>
    );
  }

  /**
   * Render search error
   *
   * @return component
   */
  renderSearchError() {
    return (
      <ContainerSearchError>
        <FormattedMessage
          id='routes.errorSearch'
          defaultMessage='No encontramos coincidencia...'>
          {txt => (<ErrorSearchError>{txt}</ErrorSearchError>)}
        </FormattedMessage>
      </ContainerSearchError>
    );
  }

  /**
   * Render search load
   *
   * @return component
   */
  renderSearchLoad() {
    return (
      <SearchLoad>
        <PulseLoader
          size={21}
          color={'#4ae16e'}
          loading={true}
        />
      </SearchLoad>
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

  /**
   * Render next page error
   *
   * @return component
   */
  renderNextPageError() {
    return (
      <ContainerSearchError>
        <FormattedMessage
          id='routes.errorNextPage'
          defaultMessage='No hay más resultados...'>
          {txt => (<ErrorSearchError>{txt}</ErrorSearchError>)}
        </FormattedMessage>
      </ContainerSearchError>
    );
  }

  /**
   * Render tabs
   *
   * @return component
   */
  renderTabs() {
    const { currentTabName } = this.state;
    const { favourites } = this.props;

    return (
      <ContainerTabs>
        <Tabs
          selected={currentTabName}
          onChangeTab={this.handleTabName}
          favouritesCount={favourites.entities.length}
        />
      </ContainerTabs>
    );
  }

  /**
   * Render tabs
   *
   * @return component
   */
  renderResults() {
    const { currentTabName } = this.state;
    const {
      routes,
      favourites,
      onClickToggleFavorite,
      onClickCurrent,
    } = this.props;

    return ([
      <ContainerResults
        key='ContainerResults1'
      >
        <RoutesList
          items={routes.entities}
          onClickToggleFavorite={onClickToggleFavorite}
          onClickCurrent={onClickCurrent}
        />
      </ContainerResults>,
      <ContainerFavourites
        key='ContainerResults2'
        show={currentTabName === 'favourites'}
      >
        {currentTabName === 'favourites' && (
          <style>
            {`
             body {
               overflow-y: hidden;
             }
           `}
          </style>
        )}
        <CloseFavorite onClick={() => { this.setState({ currentTabName: 'routes' }); }}>
          <MdClose size={40} className='gray' />
        </CloseFavorite>
        <FavouritesList
          items={favourites.entities}
          onClickToggleFavorite={onClickToggleFavorite}
          onClickCurrent={onClickCurrent}
        />
      </ContainerFavourites>,
    ]);
  }

  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };
    const { currentTabName, loadNextPage, errorNextPage } = this.state;
    const {
      init,
      routes,
      error,
      errorSearch,
      loadShape,
      loadSearch,
      errorShape,
    } = this.props;

    // if exist error
    if (error !== null) {
      return this.renderError(error);
    }

    // if init
    if (init === true) {
      return this.renderLoading();
    }

    return (
      <ContainerMain>
        <ContainerInfo>
          <ContainerOptions>
            {this.renderSearch()}
            {this.renderTabs()}
          </ContainerOptions>
          { currentTabName === 'routes' && errorSearch !== null && (this.renderSearchError())}
          { currentTabName === 'routes' && loadSearch === true && (this.renderSearchLoad())}
          { this.renderResults() }
          { currentTabName === 'routes' && loadNextPage === true && (this.renderNextPageLoad()) }
          { currentTabName === 'routes' && errorNextPage !== null && (this.renderNextPageError()) }
        </ContainerInfo>
        <ContainerMap>
          { loadShape === true && (this.renderMapLoad()) }
          { errorShape !== null && (this.renderMapError()) }
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
  /** init ui state */
  init: PropTypes.bool,
  /** error */
  error: PropTypes.string,
  /** error search routes */
  errorSearch: PropTypes.string,
  /** error get shape */
  errorShape: PropTypes.string,
  /** load get shape */
  loadShape: PropTypes.bool,
  /** load search routes */
  loadSearch: PropTypes.bool,
  /** routes object */
  routes: PropTypes.object.isRequired,
  /** favourites object */
  favourites: PropTypes.object.isRequired,
  /** function - active/desactive a favourite */
  onClickToggleFavorite: PropTypes.func.isRequired,
  /** function - active/desactive a current */
  onClickCurrent: PropTypes.func.isRequired,
  /** next page action */
  onNextPage: PropTypes.func.isRequired,
  /** search routes action */
  onSearchRoutes: PropTypes.func.isRequired,
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

const SearchLoad = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 0 0 0;
  font-weight: bold;
  @media all and (max-width: 768px) {
    padding: 100px 0 0 0;
  }
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
  background: #fff;
  z-index: 1;
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

const ContainerSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
`;

const Input = styled.input`
  padding: 10px 24px;
  width: 90%;
  border: none;
  border-radius: 39px;
  color: #fff;
  outline: none;
`;

const ContainerIconSearch = styled.figure`
  position: absolute;
  right: 10%;
`;

const ContainerTabs = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column-reverse;
  justify-content: center;
  align-items: center;
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

const ContainerFavourites = styled.section`
  position: fixed;
  width: 50%;
  bottom: 0;
  top: 0;
  background: #fff;
  z-index: 1;
  height: 100vh;
  overflow-y: scroll;
  max-height: 100%;
  ${props => props.show === true && `
    display: block;
  `}
  ${props => props.show === false && `
    display: none;
  `}
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

const CloseFavorite = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-weight: bold;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  &:hover {
    cursor: pointer;
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
const ErrorSearchError = styled.span`color: #000`;

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

const ContainerSearchError = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px 0 0 0;
  @media all and (max-width: 768px) {
    padding: 50px 0 0 0;
  }
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
