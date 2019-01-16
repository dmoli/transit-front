/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
        className='white-bg'
      >
        <ContainerNames>
          <Number color={item.route_color}>{item.route_short_name}</Number>
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
  color: #${props => props.color || '000'};
  padding: 30px;
  margin-bottom: 30px;
  width: 60%;
  border-radius: 33px;
  box-shadow: 0px 0px 26px -8px #4a4949;
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
  font-size: 5em;
  color: #${props => props.color || '000'};
`;

const Name = styled.article`
  color: #87868a;
`;

const Favourite = styled.div`
  border-radius: 50%;
  padding: 10px;
  /* box-shadow: 0px 0px 24px -6px #000;
  :hover {
    box-shadow: 0px 0px 36px -7px #000;
  } */
`;

export default Route;
