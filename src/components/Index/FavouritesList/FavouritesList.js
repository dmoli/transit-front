import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Route from '../Route';

/**
 * Favourites list
 */
class FavouritesList extends Component {
  render() {
    const {
      items,
      onClickToggleFavorite,
    } = this.props;

    return (
      <ContainerFavouritesList>
        {
          items.map(item => (
            <Route
              key={item.route_id}
              item={item}
              onClickToggleFavorite={onClickToggleFavorite}
            />
          ))
        }
      </ContainerFavouritesList>
    );
  }
}

FavouritesList.propTypes = {
  /** Items to show */
  items: PropTypes.array.isRequired,
  /** function - active/desactive a favourite */
  onClickToggleFavorite: PropTypes.func.isRequired,
};

const ContainerFavouritesList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 30px 0 13px 0;
  background: #00f;
`;

export default FavouritesList;
