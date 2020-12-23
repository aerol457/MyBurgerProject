import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const Auth = (props) => {
  const {
    path,
    building,
    onSetAuthRedirectPath,
    onAuth,
    loading,
    isAuth,
    error,
  } = props;
  const [email, setEmail] = useState({
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your E-Mail",
    },
    value: "",
    validation: {
      isRequired: true,
      isEmail: true,
    },
    isValid: false,
    touched: false,
  });
  const [password, setPassword] = useState({
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your Password",
    },
    value: "",
    validation: {
      isRequired: true,
      minLength: 6,
      maxLength: 8,
    },
    isValid: false,
    touched: false,
  });
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!building && path !== "/") {
      onSetAuthRedirectPath();
    }
  }, []);

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
    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    if (controlName === "email") {
      setEmail({
        ...email,
        value: event.target.value,
        touched: true,
        isValid: checkValidity(event.target.value, email.validation),
      });
    } else if (controlName === "password") {
      setPassword({
        ...password,
        value: event.target.value,
        touched: true,
        isValid: checkValidity(event.target.value, password.validation),
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(email.value, password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  let form = (
    <div>
      <Input
        key={email.elementConfig.type}
        elementType={email.elementConfig.type}
        elementConfig={email.elementConfig}
        value={email.value}
        changed={(event) =>
          inputChangedHandler(event, email.elementConfig.type)
        }
        invalid={!email.isValid}
        hasValidate={email.validation}
        touched={email.touched}
      />
      <Input
        key={password.elementConfig.type}
        elementType={password.elementConfig.type}
        elementConfig={password.elementConfig}
        value={password.value}
        changed={(event) =>
          inputChangedHandler(event, password.elementConfig.type)
        }
        invalid={!password.isValid}
        hasValidate={password.validation}
        touched={password.touched}
      />
    </div>
  );

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p style={{ color: "red" }}>{error.message}</p>;
  }

  let authRedirect = null;
  if (isAuth) {
    authRedirect = <Redirect to={path} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {!isSignUp ? "SIGNUP" : "SIGNIN"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    path: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
