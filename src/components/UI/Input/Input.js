import React from "react";

import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const classesInput = [classes.InputElement];
  if (props.invalid && props.hasValidate && props.touched) {
    classesInput.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classesInput.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classesInput.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classesInput.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classesInput.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
