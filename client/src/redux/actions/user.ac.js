import { DELETE_USER, SET_USER } from "../types/userTypes";
import * as endPoints from "../../config/endPoints";
import { disableLoader, enableLoader } from "./loader.ac";
import { clearError, getError } from "../actions/error.ac";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const signUp = (payload, history) => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.signUp(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
    history.replace("/");
  } else if (response.status === 403) {
    dispatch(
      getError("Такой пользователь уже существует, попробуйте авторизоваться")
    );
    history.replace("/auth/signin");
  } else {
    dispatch(getError("Зарегистрируйтесь"));
    history.replace("/auth/signup");
  }
  dispatch(disableLoader());
};

export const signIn = (payload, history, from) => async (dispatch) => {
  dispatch(enableLoader());
  const response = await fetch(endPoints.signIn(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    dispatch(clearError());
    const user = await response.json();
    dispatch(setUser(user));
    history.replace("/");
  } else if (response.status === 401) {
    dispatch(getError("Такого пользователя не существует, зарегистрируйтесь"));
    history.replace("/auth/signup");
  } else {
    history.replace("/auth/signin");
  }
  dispatch(disableLoader());
};

export const signOut = () => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: "include",
  });
  if (response.status === 200) {
    dispatch(deleteUser());
  }
};

export const checkAuth = () => async (dispatch) => {
  const response = await fetch(endPoints.checkAuth(), {
    credentials: "include",
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};

export const deleteUser = () => ({
  type: DELETE_USER,
});