import React, { useState } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.css";

const layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <div className={classes.Layout}>
      <Toolbar isAuth={props.isAuth} clicked={sideDrawerClosedHandler} />
      <SideDrawer
        isAuth={props.isAuth}
        open={showSideDrawer}
        clicked={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token,
  };
};

export default connect(mapStateToProps)(layout);
