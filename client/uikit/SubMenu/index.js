import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = () => <h2>content</h2>;

/*
 * Please edit me!
 */
const SubMenu = ({ children }) => <h1>{children}</h1>;
SubMenu.Item = MenuItem;

SubMenu.propTypes = {
  /*
   * Don't forget about little old prop types!
   */
};

export default SubMenu;
