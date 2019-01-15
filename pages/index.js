/* eslint no-shadow: [0] */
import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';

import pageWithIntl from '../src/components/PageWithIntl';
import Layout from '../src/components/App/Layout';
import Main from '../src/components/Index/Main';
import { initStore } from '../src/redux/store';
import * as routesActionCreators from '../src/components/Index/Route/redux/actions';
import * as favouritesActionCreators from '../src/components/Index/Favourite/redux/actions';

/**
 * Page component
 */
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      /** init state of ui */
      init: true,
      /** request get routes error */
      error: null,
      /** request search routes error */
      errorSearch: null,
      /** request get shape error */
      errorShape: null,
      /** load state from search route */
      loadSearch: null,
      /** load state from get shape */
      loadShape: false,
    };

    this.handleFavourites = this.handleFavourites.bind(this);
    this.handleRoutes = this.handleRoutes.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * Initial load, is called when:
   * Refresh page (server-side)
   * By Link React component (client-side)
   *
   * @return objeto a ser parte propiedades
   */
  static async getInitialProps() {
    return { };
  }

  /**
   * After mount
   */
  async componentDidMount() {
    this.getRoutes();
    this.setState({ init: false });
  }

  /**
   * Get routes from actions
   */
  async getRoutes() {
    try {
      const { actions } = this.props;
      // if exist error, set state
      if (this.state.error !== null) this.setState({ error: null });
      // dispatch get routes
      await actions.routes.get();
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  /**
   * Get routes from actions
   *
   * @param {string} text text typed
   */
  async handleNextPage(text) {
    const { actions } = this.props;
    // dispatch get next page routes
    await actions.routes.getNextPage(text);
  }

  /**
   * Search routes from actions
   *
   * @param {string} text text typed
   */
  async handleSearch(text) {
    try {
      const { actions } = this.props;
      this.setState({
        errorSearch: null,
        loadSearch: true,
      });
      // dispatch get routes
      await actions.routes.get(text);
    } catch (e) {
      this.setState({ errorSearch: e.message });
    }
    this.setState({ loadSearch: false });
  }

  /**
   * Handle favourite actions
   *
   * @param {int} routeId route id
   * @param {string} action action name, fav or unfav
   */
  handleFavourites(routeId, action) {
    const { actions } = this.props;
    if (action === 'fav') actions.favourites.add(routeId);
    if (action === 'unfav') actions.favourites.remove(routeId);
  }

  /**
   * Handle routes actions
   *
   * @param {int} routeId route id
   * @param {string} routeName route name
   * @param {string} action action name, fav or unfav
   */
  async handleRoutes(routeId, routeName, action) {
    const { actions } = this.props;
    if (action === 'current') {
      // refresh current in routes and favourites list
      actions.routes.refreshCurrent(routeId, routeName);
      try {
        this.setState({
          errorShape: null,
          loadShape: true,
        });
        // get shape by route
        await actions.routes.getShapes(routeId);
      } catch (e) {
        this.setState({ errorShape: e.message });
      }
      this.setState({ loadShape: false });
    }
  }

  render() {
    const {
      routes,
      favourites,
    } = this.props;
    const {
      init,
      error,
      errorSearch,
      errorShape,
      loadSearch,
      loadShape,
    } = this.state;

    return (
      <Layout
        title="Transit - Smart Mobility"
        place='index'
      >
        <Main
          init={init}
          error={error}
          errorSearch={errorSearch}
          errorShape={errorShape}
          loadShape={loadShape}
          loadSearch={loadSearch}
          routes={routes}
          favourites={favourites}
          onClickToggleFavorite={this.handleFavourites}
          onClickCurrent={this.handleRoutes}
          onNextPage={this.handleNextPage}
          onSearchRoutes={this.handleSearch}
        />
      </Layout>
    );
  }
}

Index.propTypes = {
  /** routes element from global state */
  routes: PropTypes.object.isRequired,
  /** favourites element from global state */
  favourites: PropTypes.object.isRequired,
  /** redux actions */
  actions: PropTypes.object.isRequired,
};

/**
 * Take props from global state
 *
 * @param {object} state global state
 */
const mapStateToProps = state => ({
  routes: state.routes,
  favourites: state.favourites,
});

/**
 * Transform actions to props, to bring us an agile dispatch
 *
 * @param {object} dispatch dispatch of actions
 */
const mapDispatchToProps = dispatch => ({
  actions: {
    routes: bindActionCreators(routesActionCreators, dispatch),
    favourites: bindActionCreators(favouritesActionCreators, dispatch),
  },
});

/**
 * Conection with the Reduc HOC
 */
const IndexRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);


/**
 * Conection with the React INTL HOC
 */
export default pageWithIntl(IndexRedux);
