import {
  ADD_WISH,
  ALL_WISHES,
  DELETE_WISH,
  EDIT_WISH,
  WISH_IS_GIVEN,
} from "../types/types";

export function getAllWishes() {
  return async (dispatch) => {
    let response = await fetch("http://localhost:3001/wish", {
      credentials: "include",
    });
    let result = await response.json();
    console.log(result, "result");
    return dispatch({
      type: ALL_WISHES,
      payload: result,
    });
  };
}

export function addNewWish(wish) {
  return async (dispatch) => {
    let response = await fetch("http://localhost:3001/wish", {
      method: "POST",
      credentials: "include",
      body: wish,
    });
    const newWish = await response.json();
    return dispatch({
      type: ADD_WISH,
      payload: newWish,
    });
  };
}

export function editWish(wish) {
  console.log(wish, "зашел в экшн");
  return async (dispatch) => {
    let response = await fetch("http://localhost:3001/wish", {
      method: "PATCH",
      credentials: "include",
      body: wish,
    });
    const result = await response.json();
    if (result.status == 200) {
      const editedWish = Object.fromEntries(wish);
      const editedWishWithPhoto = {
        ...editedWish,
        WishPhoto: { image: result.filePath },
      };
      return dispatch({
        type: EDIT_WISH,
        payload: editedWishWithPhoto,
      });
    }
  };
}

export function delWish(id) {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/wish/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return dispatch({
      type: DELETE_WISH,
      payload: id,
    });
  };
}

export function isGiven(id) {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/wish/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: id,
    });
    console.log(id, "GET ID SUKANAH");
    return dispatch({
      type: WISH_IS_GIVEN,
      payload: id,
    });
  };
}
