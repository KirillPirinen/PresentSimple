import { DELETE_USER, SET_USER } from "../types/userTypes";
import * as endPoints from "../../config/endPoints";
import { disableLoader, enableLoader } from "./loader.ac";
import { clearErrorAuth, getErrorAuth } from "./errorAuth.ac";
import { clearError, getError } from "./error.ac";
import { setWishList } from "./wishlist.ac";

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
    const data = await response.json();
    dispatch(setUser(data.user));
    dispatch(setWishList(data.wishlist));
    history.replace("/");
  } else if (response.status === 403) {
    dispatch(
      getErrorAuth(
        "Такой пользователь уже существует, попробуйте авторизоваться"
      )
    );
    history.replace("/auth/signin");
  } else if (response.status === 411) {
    dispatch(getErrorAuth("Номер телефона должен содержать 11 символов"));
  } else {
    dispatch(getErrorAuth("Зарегистрируйтесь"));
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
  const user = await response.json();
  if (response.status === 200) {
    dispatch(clearError());
    dispatch(setUser(user));
    return history.replace("/");
  } 
  else if (response.status === 401) {
    dispatch(setUser(user));
    //history.replace("/auth/signup");
  } 
  else {
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
  } else if (response.status === 401) {

  }
};

export const deleteUser = () => ({
  type: DELETE_USER,
});
