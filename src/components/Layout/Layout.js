import React from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = props => (
  <>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default layout;
