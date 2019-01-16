/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FaStar,
} from 'react-icons/lib/fa';
import {
  MdFavoriteOutline,
} from 'react-icons/lib/md';

/**
 * Componente ruta
 */
class Route extends Component {
  /**
   * Handle favourite actions
   *
   * @param {int} routeId route id
   * @param {string} action action name, favourite or unfavourite
   * @return array of routes seted
   */
  handleFavourites(routeId, action) {
    const { onClickToggleFavorite } = this.props;
    onClickToggleFavorite(routeId, action);
  }

  /**
   * Handle current behavior
   *
   * @param {int} routeId route id
   * @param {string} routeName route name
   * @param {bol} currentState current boolean field
   */
  handleCurrent(routeId, routeName, currentState) {
    if (currentState === true) return;
    const { onClickCurrent } = this.props;
    onClickCurrent(routeId, routeName, 'current');
  }

  render() {
    const { item } = this.props;

    return (
      <ContainerRoute
        key={item.route_id}
        background={item.route_color}
        color={item.route_text_color}
        current={item.current}
        onClick={() => this.handleCurrent(item.route_id, item.route_short_name, item.current)}
      >
        <ContainerNames>
          <Number>{item.route_short_name}</Number>
          <Name>{item.route_long_name}</Name>
        </ContainerNames>
        <Favourite
          onClick={() => this.handleFavourites(item.route_id, (item.favorited ? 'unfav' : 'fav'))}
        >
          {
            item.favorited
          }
          <MdFavoriteOutline
            size={30}
            color={'#d40066'}
            className={item.favorited ? 'pointer-hover red' : 'pointer-hover white'}
          />
        </Favourite>
      </ContainerRoute>
    );
  }
}

Route.propTypes = {
  /* item a mostrar */
  item: PropTypes.object.isRequired,
  /** function - active/desactive a favourite */
  onClickToggleFavorite: PropTypes.func.isRequired,
  /** function - active/desactive a current */
  onClickCurrent: PropTypes.func.isRequired,
};

const ContainerRoute = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  background-color: #${props => props.background || 'fff'};
  color: #${props => props.color || '000'};
  padding: 30px;
  margin-bottom: 15px;
  width: 60%;
  border-radius: 18px;
  box-shadow: 0px 0px 28px -6px #000;
  ${props => props.current === true && `
    background: #00f;
    color: #fff;
  `}
  /* &:hover {
    box-shadow: 0px 0px 11px 4px rgba(167, 166, 166, 0.42);
    cursor: pointer;
  } */
`;

const ContainerNames = styled.article`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Number = styled.h1`
  font-size: 4em;
`;

const Name = styled.article``;

const Favourite = styled.div`
  border-radius: 50%;
  padding: 10px;
  /* box-shadow: 0px 0px 24px -6px #000;
  :hover {
    box-shadow: 0px 0px 36px -7px #000;
  } */
`;

export default Route;
