import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import Immutable from 'immutable';

import styles from 'scss/components/_navigation';

export default
class Navigation extends React.Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  render() {
    return (
      <Navbar brand={<a href="/">
        <img
          src={'http://www.jcatalog.com/WeceemFiles/de/Image/jclogo.png'} height= "30px" className={styles.logo} alt="jCatalog"/>
      </a>}>
        <Nav>
          <NavItemLink
            to="ruleEngineHome">
          RuleEngineHome
          </NavItemLink>
        </Nav>
      </Navbar>
    );
  }

}

Navigation.propTypes = {user: React.PropTypes.instanceOf(Immutable.Map)};
