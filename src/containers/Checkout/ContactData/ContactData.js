import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as orderActions from "../../../store/actions/index";
import axios from "../../../axios-orders";
import errorHandler from "../../../hoc/ErrorHandler/ErrorHandler";

const contactData = (props) => {
  const [orderForm, setOrderform] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Type a Name..",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      isValid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Type a Street..",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      isValid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Type a Zip Code..",
      },
      value: "",
      validation: {
        isRequired: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      isValid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Type a Country..",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      isValid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Type an E-Mail..",
      },
      value: "",
      validation: {
        isRequired: true,
        isEmail: true,
      },
      isValid: false,
      touched: false,
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        type: "text",
        placeholder: "Type an Delivery Method..",
        options: [{ value: "fastest" }, { value: "cheapest" }],
      },
      value: "fastest",
      isValid: true,
      validation: {},
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderedHandler = (event) => {
    event.preventDefault();
    const contactKeyValue = {};
    for (let contactIdentifier in orderForm) {
      contactKeyValue[contactIdentifier] = orderForm[contactIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.totalPrice,
      contactData: contactKeyValue,
      idUser: props.idUser,
    };
    props.onAddedOrder(order, props.token);
    props.history.replace("/");
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.isRequired) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = { ...orderForm };
    const updatedFormElement = { ...updateOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updatedFormElement;

    let isValid = true;
    for (let inputIdentifier in updateOrderForm) {
      isValid = updateOrderForm[inputIdentifier].isValid && isValid;
    }
    setFormIsValid(isValid);
    setOrderform(updateOrderForm);
  };

  const formElementArray = Object.keys(orderForm).map((key) => {
    return {
      id: key,
      config: orderForm[key],
    };
  });
  let form = (
    <form onSubmit={orderedHandler}>
      {formElementArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.isValid}
            hasValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your cotact data:</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    idUser: state.auth.idUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedOrder: (data, token) =>
      dispatch(orderActions.purchaseBurgerStart(data, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(contactData, axios));
