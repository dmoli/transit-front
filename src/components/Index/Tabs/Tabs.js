/* eslint no-return-assign: [0] */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

/**
 * Tabs Component
 */
class Tabs extends Component {
  constructor() {
    super();

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  /**
   * Notify the parent component that tabs has been changed
   *
  * @param tabName tab name
   */
  handleTabClick(tabName) {
    const { onChangeTab } = this.props;
    onChangeTab(tabName);
  }

  render() {
    const { selected, favouritesCount } = this.props;

    return (
      <ContainerTabs>
        <Tab
          selected={selected === 'routes'}
          onClick={() => this.handleTabClick('routes')}
        >
          <FormattedMessage
            id='tabs.routes'
            defaultMessage='Recorridos'>
            {txt => (<TabName className='green'>{txt}</TabName>)}
          </FormattedMessage>
        </Tab>
        <Tab
          selected={selected === 'favourites'}
          onClick={() => this.handleTabClick('favourites')}
        >
          <FormattedMessage
            id='tabs.favourites'
            defaultMessage='Favoritos'>
            {txt => (<TabName className='green'>{txt}</TabName>)}
          </FormattedMessage>
          {favouritesCount > 0 && (
            <Count className='green-bg white'>
              {favouritesCount}
            </Count>
          )}
        </Tab>
      </ContainerTabs>
    );
  }
}

Tabs.defaultProps = {
  selected: 'routes',
  favouritesCount: 0,
};

Tabs.propTypes = {
  /* Tab name selected */
  selected: PropTypes.string,
  /* favourites's count  */
  favouritesCount: PropTypes.number,
  /* function - Notify the parent component that tabs has been changed */
  onChangeTab: PropTypes.func.isRequired,
};

const ContainerTabs = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: 5px 0 0 0;
`;

const Tab = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 13px 0px;
  margin: 0 20px 0 0;
  border-bottom: 3px solid transparent;
  :hover {
    cursor: pointer;
  }
  ${props => props.selected === true && `
    border-bottom: 3px solid #4ce26d;
  `}
`;

const TabName = styled.span`
  display: flex;
`;

const Count = styled.div`
  display: flex;
  position: absolute;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  right: -40px;
  top: 6px;
`;

export default Tabs;
