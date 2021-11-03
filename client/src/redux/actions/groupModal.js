import { ALL_WISHES_PERSON } from "../types/groupModalTypes";
import axios from "axios";
import { getProgressbar } from "./Progressbar.ac";

export const getAllWishes = (value) => {
  return { type: ALL_WISHES_PERSON, payload: value };
};

export const getWishesPersonWatchPeople = (user_id) => async (dispatch) => {
  let response = await axios.get(
    `http://localhost:3001/api/v1/group/${user_id}`,
    { withCredentials: true }
  );
  if (response.status === 200) {
    console.log("response.data", response.data);
    dispatch(getAllWishes(response.data));
  }
};

export const addAlone = (wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/alone/${user_id}`,
    {
      wish_id,
    },
    { withCredentials: true }
  );
  if (response.status === 200) {
    dispatch(getAllWishes(response.data));
  }
};

export const addGroup = (maxusers, telegram, wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/add/${user_id}`,
    {
      maxusers,
      telegram,
      wish_id
    },
    { withCredentials: true }
  );
  if (response.status === 200) {
    console.log("response.dataADDGROUP", response.data);
    dispatch(getWishesPersonWatchPeople(user_id));
    dispatch(getProgressbar(response.data?.wishes?.Wishes?.Group));
    // dispatch(getProgressbar(response.data));
    // dispatch(getAllWishes(response.data));
  }
};

export const joinGroup = (wish_id, user_id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/join/${user_id}`,
    { wish_id },
    { withCredentials: true }
  );
  if (response.status === 200) {
    console.log("response.dataJOINGROUP", response.data);
    dispatch(getWishesPersonWatchPeople(user_id));
    dispatch(getProgressbar(response.data));
  } else if (response.status === 202) {
    console.log("response.dataJOINGROUP", response.data);
    // dispatch(getAllWishes(response.data.wishes));
    // dispatch(getProgressbar(response.data.groups));
  } else if (response.status === 201) {
    console.log("response.dataJOINGROUP", response.data);
    dispatch(getProgressbar(response.data.map((el) => el.Wishes)));

  } else if (response.status === 501) {
    console.log("response.dataJOINGROUP", response.data);
    //ошибка: превышено количество людей в группе
  }
};
