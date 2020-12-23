import React from "react";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" clicked={props.clicked}>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticate ? (
      <NavigationItem link="/orders" clicked={props.clicked}>
        My Orders
      </NavigationItem>
    ) : null}
    {props.isAuthenticate ? (
      <NavigationItem link="/logout" clicked={props.clicked}>
        Logout
      </NavigationItem>
    ) : (
      <NavigationItem link="/auth" clicked={props.clicked}>
        Authenticate
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
