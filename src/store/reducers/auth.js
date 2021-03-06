import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  idUser: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    idUser: action.idUser,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    idUser: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};
export default authReducer;
