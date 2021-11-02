import { GROUP, ALL_WISHES_PERSON } from "../types/groupModalTypes";
import axios from "axios";
import { getProgressbar } from "./Progressbar.ac";

export const getAllWishes = (value) => {
  return { type: ALL_WISHES_PERSON, payload: value };
};

export const addGroupFromBack = (value) => {
  return { type: GROUP, payload: value };
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
  console.log("response.data", response.data);
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
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(addGroupFromBack(response.data));
    dispatch(getProgressbar(response.data));
  }
};

export const joinGroup = (wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/join/${user_id}`,
    { wish_id },
    { withCredentials: true }
  );
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(addGroupFromBack(response.data));
    dispatch(getProgressbar(response.data));
  } else if (response.status === 202) {
    console.log("response.data", response.data);
    // dispatch(getAllWishes(response.data.wishes));
    // dispatch(getProgressbar(response.data.groups));
  } else if (response.status === 201) {
    dispatch(getAllWishes(response.data.wishes));
    dispatch(getProgressbar(response.data.groups));
  } else if (response.status === 501) {
    console.log("response.data", response.data);
    //ошибка: превышено количество людей в группе
  }
};
