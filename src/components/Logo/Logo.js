import React from "react";

import classes from "./Logo.css";

import logoBurgerImage from "../../assets/images/burger-logo.png";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoBurgerImage} alt="MyBurger" />
  </div>
);

export default logo;
