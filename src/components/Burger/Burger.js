import React from "react";

import classes from "./Burger.css";
import BurgerIngedient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  return (
    <div className={classes.Burger}>
      <BurgerIngedient type="bread-top" />
      <BurgerIngedient type="cheese" />
      <BurgerIngedient type="meat" />
      <BurgerIngedient type="bread-bottom" />
    </div>
  );
};

export default burger;
