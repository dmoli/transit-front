/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Componente ruta
 */
class Route extends Component {
  render() {
    const { item } = this.props;

    return (
      <ContainerRoute
        background={item.route_color}
        color={item.route_text_color}
      >
        <Number>{item.route_short_name}</Number>
        <Name>{item.route_long_name}</Name>
      </ContainerRoute>
    );
  }
}

Route.propTypes = {
  /* item a mostrar */
  item: PropTypes.object.isRequired,
};

const ContainerRoute = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-color: #${props => props.background || 'fff'};
  color: #${props => props.color || '000'};
  padding: 30px 0;
  width: 100%;
  margin-bottom: 15px;
  &:hover {
    box-shadow: 0px 0px 11px 4px rgba(167, 166, 166, 0.42);
    cursor: pointer;
  }
`;

const Number = styled.h1`
  font-size: 2em;
`;

const Name = styled.article``;

export default Route;
