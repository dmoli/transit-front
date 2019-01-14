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
      onClickCurrent,
    } = this.props;

    return (
      <ContainerRoutesList>
        {
          items.map(item => (
            <Route
              key={item.route_id}
              item={item}
              onClickToggleFavorite={onClickToggleFavorite}
              onClickCurrent={onClickCurrent}
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
  /** function - active/desactive a current */
  onClickCurrent: PropTypes.func.isRequired,
};

const ContainerRoutesList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export default RoutesList;
