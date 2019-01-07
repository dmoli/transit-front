/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';

import Map from '../../Elements/Map';


/**
 * Componente principal
 */
class Main extends Component {
  render() {
    const center = { lat: -33.4314474, lng: -70.6093325 };

    return (
      <ContainerMain>
        <ContainerMap>
          <Map
            center={center}
            markers={[]}
            zoomCustom={10}
          />
        </ContainerMap>
        <ContainerRoutes>

        </ContainerRoutes>
      </ContainerMain>
    );
  }
}

const ContainerMain = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  /* padding-top: 64px; */
  @media all and (max-width: 704px) {
    flex-direction: row;
  }
`;

const ContainerMap = styled.section`
  width: 100%;
  height: 50vh;
  @media all and (max-width: 704px) {
    order: 2;
  }
`;

const ContainerRoutes = styled.section`
  width: 100%;
  height: 50vh;
  background: #ff0;
  @media all and (max-width: 704px) {
    order: 1;
  }
`;

export default Main;
