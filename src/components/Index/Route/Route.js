/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Componente ruta
 */
class Route extends Component {
  render() {
    return (
      <ContainerRoute
        background='00D5FF'
        color='000'
      >
        <Number>210</Number>
        <Name>Recoleta - Cerrillos</Name>
      </ContainerRoute>
    );
  }
}

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
`;

const Number = styled.h1`
  font-size: 2em;
`;

const Name = styled.article``;

export default Route;
