import { CHECK_EMAIL, DELETE_USER, SET_USER } from "../types/userTypes";
import * as endPoints from "../../config/endPoints";
import { disableLoader, enableLoader } from "./loader.ac";
import { clearError, getError } from "./error.ac";
import { setWishList } from "./wishlist.ac";
import axios from "axios";

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
  const data = await response.json();
  if (response.status === 200) {
    dispatch(setUser(data));
    history.replace("/");
  } else if (response.status === 403) {
    dispatch(getError(data));
    history.replace("/auth/signin");
  } else {
    dispatch(getError(data));
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
  } else if (response.status === 401) {
    dispatch(setUser(user));
    //history.replace("/auth/signup");
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
  let user;
  if (response.status === 200) {
    user = await response.json();
    dispatch(setUser(user));
  } else if (response.status === 401) {
    getError(user)
  }
};

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const checkEmail = (email) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/api/v1/auth/checkemail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email }),
  });
  const data = await response.json();
  if (response.status === 200) {
    dispatch(getError(data.message));
  }
};

export const resetPasswordAction =
  (payload, history, reset_password_id) => async (dispatch) => {
    dispatch(enableLoader());
    const response = await fetch(
      `http://localhost:3001/api/v1/auth/resetpassword/${reset_password_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log("dataresetPassword", data);
    if (response.status === 200) {
      dispatch(getError(data.message));
    }
  };
