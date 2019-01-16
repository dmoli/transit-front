/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  MdFavorite,
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
          <Number
            color={item.route_color}
            current={item.current}
          >
            {item.route_short_name}
          </Number>
          <Name current={item.current}>
            {item.route_long_name}
          </Name>
        </ContainerNames>
        <Favourite
          onClick={() => this.handleFavourites(item.route_id, (item.favorited ? 'unfav' : 'fav'))}
        >
          {
            (item.favorited === false || item.favorited === undefined) && (
              <MdFavoriteOutline
                size={30}
                color={'#e9004b'}
                className={'pointer-hover'}
              />
            )
          }
          {
            item.favorited === true && (
              <MdFavorite
                size={30}
                color={'#e9004b'}
                className={'pointer-hover'}
              />
            )
          }
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
    background: #09a748; /* Old browsers */
    background: -moz-linear-gradient(left, #09a748 0%, #00b348 50%, #00cc2c 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #09a748 0%, #00b348 50%, #00cc2c 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #41a2c7 0%, #00b348 50%, #56e275 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#09a748', endColorstr='#00cc2c',GradientType=1 ); /* IE6-9 */
    color: #fff;
  `}
  &:hover {
    box-shadow: 0px 0px 11px 4px rgba(167, 166, 166, 0.42);
    cursor: pointer;
  }
`;

const ContainerNames = styled.article`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Number = styled.h1`
  font-size: 5em;
  color: #${props => props.color || '000'};
  ${props => props.current === true && `
    color: #fff;
  `}
`;

const Name = styled.article`
  color: #87868a;
  ${props => props.current === true && `
    color: #fff;
  `}
`;

const Favourite = styled.div`
  border-radius: 50%;
  padding: 10px;
`;

export default Route;
