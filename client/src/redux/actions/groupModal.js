import { GROUP_MODAL, GROUP, DONATE_TO_YOURSELF } from "../types/groupModalTypes";
import axios from "axios";

export const groupModal = (value) => {
  return { type: GROUP_MODAL, payload: value };
};

export const addGroupFromBack = (value) => {
  return { type: GROUP, payload: value };
};

export const addAlone = (value) => {
  return {type: DONATE_TO_YOURSELF, payload: value}
}

export const addGroup = (maxusers, telegram) => async (dispatch) => {
  let response = await axios.post(`http://localhost:3001/api/v1/group/add`, {
    maxusers,
    telegram,
  });
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(addGroupFromBack(response.data));
  }
};

export const donateToYourself = (wish_id) => async (dispatch) => {
  let response = await axios.post('http://localhost:3001/api/v1/group/alone', {
    wish_id,
  })
  console.log('response.data', response.data)
  if(response.status === 200) {
    dispatch(addAlone(response.data))
  }
}

export const joinGroup = (wish_id) => async (dispatch) => {
  let response = await axios.post(`http://localhost:3001/api/v1/group/join`, {
    wish_id
  });
  console.log("response.data", response.data);
  if (response.status === 200) {
    dispatch(addGroupFromBack(response.data));
  } else if(response.status === 501) {
    //ошибка сервера, не удалось добавить в группу
  } else if(response.status === 416) {
   //ошибка: превышено количество людей в группе
  }
};
