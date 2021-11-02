import {
  ALL_WISHES_PERSON,
  BUTTON_ALONE,
  BUTTON_ADD_GROUP,
  BUTTON_JOIN_GROUP,
} from "../types/groupModalTypes";
import axios from "axios";
import { getProgressbar } from "./Progressbar.ac";

export const showButtonAlone = (value) => {
  return { type: BUTTON_ALONE, payload: value };
};

export const showButtonAddGroup = (value) => {
  return { type: BUTTON_ADD_GROUP, payload: value };
};

export const showButtonJoinGroup = (value) => {
  return { type: BUTTON_JOIN_GROUP, payload: value };
};

export const getAllWishes = (value) => {
  return { type: ALL_WISHES_PERSON, payload: value };
};

export const getWishesPersonWatchPeople = (user_id) => async (dispatch) => {
  let response = await axios.get(
    `http://localhost:3001/api/v1/group/${user_id}`,
    { withCredentials: true }
  );
  if (response.status === 200) {
    dispatch(getAllWishes(response.data));
  }
};

export const addAlone = (wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/alone/${user_id}`,
    {
      wish_id,
    }
  );
  if (response.status === 200) {
    dispatch(getAllWishes(response.data));
  }
};

export const addGroup = (maxusers, telegram, wish_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/add/${wish_id}`,
    {
      maxusers,
      telegram,
    },
    { withCredentials: true }
  );
  if (response.status === 200) {
    dispatch(getProgressbar(response.data));
    dispatch(showButtonAlone(false));
    dispatch(showButtonJoinGroup(true));
    dispatch(showButtonAddGroup(false));
  }
};

export const joinGroup = (wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/join/${user_id}`,
    { wish_id },
    { withCredentials: true }
  );
  if (response.status === 200) {
    dispatch(getProgressbar(response.data));
  } else if (response.status === 202) {
    // dispatch(getAllWishes(response.data.wishes));
    // dispatch(getProgressbar(response.data.groups));
  } else if (response.status === 201) {
    dispatch(getAllWishes(response.data.wishes));
    dispatch(getProgressbar(response.data.groups));
  } else if (response.status === 501) {
    //ошибка: превышено количество людей в группе
  }
};
