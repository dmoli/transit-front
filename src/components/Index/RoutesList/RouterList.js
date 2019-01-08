import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Route from '../Route';

/**
 * Componente que lista las rutas
 */
class RoutesList extends Component {
  render() {
    const {
      items,
      onClickToggleFavorite,
    } = this.props;

    return (
      <ContainerRoutesList>
        {
          items.map(item => (
            <Route
              key={item.id}
              item={item}
              onClickToggleFavorite={onClickToggleFavorite}
            />
          ))
        }
      </ContainerRoutesList>
    );
  }
}

RoutesList.propTypes = {
  /** Items a mostrar */
  items: PropTypes.array.isRequired,
  /** acción activa/desactiva un favorite */
  onClickToggleFavorite: PropTypes.func.isRequired,
};

const ContainerRoutesList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 30px 0 13px 0;
`;

export default RoutesList;
