/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Componente principal
 */
class Main extends Component {
  render() {
    return (
      <ContainerMain>
        <Background />
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
`;

const Background = styled.section`
  width: 100%;
  height: 100vh;
  background-image:
  -webkit-gradient(linear,right top,left top, color-stop(20%,rgb(4, 203, 122)),
  color-stop(85%,rgba(0,0,0,0)));
  background-image: -webkit-linear-gradient(right,rgb(4, 203, 122, 0.78) 20%,rgb(0, 156, 255, 0.78));
  background-image: -moz-linear-gradient(right,rgb(4, 203, 122, 0.78) 20%,rgb(0, 156, 255, 0.78));
  background-image: -o-linear-gradient(right,rgb(4, 203, 122, 0.78) 20%,rgb(0, 156, 255, 0.78));
  background-image: linear-gradient(to left,rgb(4, 203, 122, 0.78) 20%,rgb(0, 156, 255, 0.78));
  position: absolute;
  left: 0px;
  top: 0px;
`;

export default Main;
