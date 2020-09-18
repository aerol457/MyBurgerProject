import React from "react";

import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong> $
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            removed={() => props.removeIngredientFunc(control.type)}
            added={() => props.addIngredientFunc(control.type)}
            key={control.label}
            label={control.label}
            disabled={props.disabled[control.type]}
          />
        );
      })}
      <button className={classes.OrderButton} disabled={!props.purchasable}>
        ORDER NOW!
      </button>
    </div>
  );
};

export default buildControls;
