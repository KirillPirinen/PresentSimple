import {DELETE_USER, SET_USER } from "../types/userTypes";
import initPoints from "../../config/endPoints";
import { enableLoader } from "./loader.ac";
import { getError, getInfo } from "./error.ac";
import customFetch from "../../custom/customFetch";


export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const signUp = (payload, history) => async (dispatch) => {
  const {status, data} = await customFetch(dispatch, initPoints.signUp, {method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(payload),
  })

  dispatch(setUser(data));

  if (status === 200) {
    return history.replace("/");
  } else if (status === 403) {
    return history.replace("/auth/signin");
  } 
};

export const signIn = (payload, history) => async (dispatch) => {
  const {status, data} = await customFetch(dispatch, initPoints.signIn, {method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(payload),
  })
  dispatch(setUser(data));
  if (status === 200) {
    return history.replace("/");
  }
};

export const signOut = () => async (dispatch) => {
  const {status} = await customFetch(dispatch, initPoints.signOut, {credentials: "include",});
  if (status === 200) dispatch(deleteUser());
};

export const checkAuth = () => async (dispatch) => {
  const {data, status} = await customFetch(dispatch, initPoints.checkAuth, {credentials: "include"});
  if(status === 200) dispatch(setUser(data));
  else if(status === 401) dispatch(deleteUser())
};

export const checkEmail = (email) => async (dispatch) => {
  const {status, data} = await customFetch(dispatch, initPoints.checkEmail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email }),
  });
  if (status === 200) {
    dispatch(getError(data.message));
  }
};

export const resetPasswordAction =
  (payload, history, reset_password_id) => async (dispatch) => {
    dispatch(enableLoader());
    const {status, data} = await customFetch(dispatch,
      initPoints.resetPassword + String(reset_password_id),
      {method: "POST",
       headers: {"Content-Type": "application/json"},
       credentials: "include",
       body: JSON.stringify(payload)
      }
    );
    if (status === 200) {
      dispatch(getInfo(data.info));
    }
  };

  