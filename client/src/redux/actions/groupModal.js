import {
  GROUP,
  WISH_BINDED,
  ALL_WISHES_PERSON,
} from "../types/groupModalTypes";
import axios from "axios";

export const getAllWishes = (value) => {
  return { type: ALL_WISHES_PERSON, payload: value };
};

export const changeStatusWish = (value) => {
  return { type: WISH_BINDED, payload: value };
};

export const addGroupFromBack = (value) => {
  return { type: GROUP, payload: value };
};

export const getWishesPersonWatchPeople = (id) => async (dispatch) => {
  let response = await axios.get(`http://localhost:3001/api/v1/group/${id}`);
  if (response.status === 200) {
    dispatch(getAllWishes(response.data));
  }
};

export const addGroup =
  (maxusers, telegram, wish_id, user_id) => async (dispatch) => {
    let response = await axios.post(
      `http://localhost:3001/api/v1/group/add/${wish_id}`,
      {
        maxusers,
        telegram,
        user_id,
      }
    );
    console.log("response.data", response.data);
    if (response.status === 200) {
      dispatch(addGroupFromBack(response.data));
      // dispatch(changeStatusWish(response.data.wish));
    }
  };

export const donateToYourself = (wish_id, id) => async (dispatch) => {
  let response = await axios.post(
    `http://localhost:3001/api/v1/group/alone/${id}`,
    {
      wish_id,
    }
  );
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(getAllWishes(response.data));
  }
};

export const joinGroup = (wish_id, user_id) => async (dispatch) => {
  console.log("lalalal");
  let response = await axios.post(`http://localhost:3001/api/v1/group/join`, {
    wish_id,
    user_id,
  });
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(addGroupFromBack(response.data));
  } else if (response.status === 501) {
    //ошибка сервера, не удалось добавить в группу
  } else if (response.status === 416) {
    //ошибка: превышено количество людей в группе
  }
};
