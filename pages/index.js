/* eslint no-shadow: [0] */
import React from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';

import pageWithIntl from '../src/components/PageWithIntl';
import Layout from '../src/components/App/Layout';
import Main from '../src/components/Index/Main';
import { initStore } from '../src/redux/store';
import * as uiActionCreators from '../src/redux/actions';

/**
 * Componente contenedor de index
 */
class Index extends React.Component {
  /**
   * Carga inicial
   * Se llama: al refrescar la páginas server-side
   * Se llama: vía Link client-side
   *
   * @param props propiedades enviadas desde sus HOC
   * @return objeto a ser parte propiedades
   */
  static async getInitialProps() {
    return { };
  }

  /**
   * Después de montar, despacha acciones
   * Se llama: al refrescar la páginas client-side
   * Se llama: vía Link client-side
   */
  async componentDidMount() {
    const { actions } = this.props;
    actions.ui.closeMenu();
  }

  render() {
    const {
      ui,
      actions,
    } = this.props;

    return (
      <Layout
        title=""
        place='index'
        showMenu={ui.showMenu}
        onClickShowMenu={actions.ui.showMenu}
        onClickCloseMenu={actions.ui.closeMenu}
      >
        <Main />
      </Layout>
    );
  }
}

Index.propTypes = {
  /** estados globales de ui */
  ui: PropTypes.object.isRequired,
  /** acciones de redux */
  actions: PropTypes.object.isRequired,
};

/**
 * Le pide al estado global sólo lo que necesita para este componente
 */
const mapStateToProps = state => ({
  ui: state.ui,
});

/**
 * Transforma acciones externas a propiedades, para realizar el despacho más ágil
 */
const mapDispatchToProps = dispatch => ({
  actions: {
    ui: bindActionCreators(uiActionCreators, dispatch),
  },
});

/**
 * Conexión con el HOC Redux
 */
const IndexRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);


/**
 * Conexión con el HOC de React INTL
 */
export default pageWithIntl(IndexRedux);
