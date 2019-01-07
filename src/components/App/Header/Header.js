import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => NProgress.done();

/**
 * Header principal de la webapp
 */
class Header extends Component {
  render() {
    return (
      <ContainerHeader className='gradient-green-bg'>
        <Link href='/'>
          <a>
            <Logotipo>
              <img src="/static/logo.svg"
                width="100"
                height="35"
                alt="Logo Transit" />
            </Logotipo>
          </a>
        </Link>
      </ContainerHeader>
    );
  }
}

const ContainerHeader = styled.header`
  text-transform: uppercase;
  padding: 12px 15px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 4;
  box-shadow: 0px 0px 0px #000;
  justify-content: space-between;
`;

const Logotipo = styled.figure`
  margin: 0;
  display: inline-block;
  padding: 1px 0 0 0;
  margin: 0 0 0 0px;
`;

export default injectIntl(Header);
