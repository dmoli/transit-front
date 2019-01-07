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
    const { selected } = this.props;

    return (
      <ContainerTabs>
        <Tab
          selected={selected === 'routes'}
          onClick={() => this.handleTabClick('routes')}
        >
          <FormattedMessage
            id='tabs.routes'
            defaultMessage='Recorridos'>
            {txt => (<TabName>{txt}</TabName>)}
          </FormattedMessage>
        </Tab>
        <Tab
          selected={selected === 'favourites'}
          onClick={() => this.handleTabClick('favourites')}
        >
          <FormattedMessage
            id='tabs.favourites'
            defaultMessage='Favoritos'>
            {txt => (<TabName>{txt}</TabName>)}
          </FormattedMessage>
        </Tab>
      </ContainerTabs>
    );
  }
}

Tabs.defaultProps = {
  selected: 'routes',
};

Tabs.propTypes = {
  /* Tab name selected */
  selected: PropTypes.string,
  /* function - Notify the parent component that tabs has been changed */
  onChangeTab: PropTypes.func.isRequired,
};

const ContainerTabs = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 0;
  width: 100%;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 3px solid transparent;
  :hover {
    cursor: pointer;
  }
  ${props => props.selected === true && `
    border-bottom: 3px solid #3aa0c8;
  `}
`;

const TabName = styled.span`
  display: flex;
`;

export default Tabs;
