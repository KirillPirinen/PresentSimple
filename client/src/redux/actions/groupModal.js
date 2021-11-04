import { ALL_WISHES_PERSON } from "../types/groupModalTypes";
import axios from "axios";
import { getProgressbar } from "./Progressbar.ac";
import { getError } from "./error.ac";

export const getAllWishes = (value) => {
  return { type: ALL_WISHES_PERSON, payload: value };
};

export const getWishesPersonWatchPeople = (user_id) => async (dispatch) => {
  try {
    let response = await axios.get(
      `http://localhost:3001/api/v1/group/${user_id}`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("response.data", response.data);
      dispatch(getAllWishes(response.data));
    } else {
      dispatch(getError(response?.data))
    }
  } catch (err) {
    dispatch(getError(err))
  }
  
};

export const addAlone = (wish_id, user_id) => async (dispatch) => {
  try{
    let response = await axios.post(
      `http://localhost:3001/api/v1/group/alone/${user_id}`,
      {
        wish_id,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      dispatch(getAllWishes(response.data));
      dispatch(getWishesPersonWatchPeople(user_id))
    }else {
      dispatch(getError(response?.data))
    }
  } catch (err) {
    dispatch(getError(err))
  }
  
};

export const addGroup = (maxusers, telegram, wish_id, user_id) => async (dispatch) => {
  try{
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
      console.log("response.dataADDGROUP", response.data?.wishes?.Wishes);
      // dispatch(getWishesPersonWatchPeople(user_id))
      dispatch(getAllWishes(response.data?.wishes))
      dispatch(getProgressbar(response.data?.wishes?.Wishes));
    } else {
      dispatch(getError(response?.data))
    }
  } catch(err) {
    dispatch(getError(err))
  }
};

export const joinGroup = (wish_id, user_id) => async (dispatch) => {
  try{
    let response = await axios.post(
      `http://localhost:3001/api/v1/group/join/${user_id}`,
      { wish_id },
      { withCredentials: true }
    );
    if (response.status === 200) {
      // console.log("response.dataJOINGROUP", response.data?.wishes);
      // dispatch(getWishesPersonWatchPeople(user_id))
      dispatch(getAllWishes(response.data?.wishes));
      dispatch(getProgressbar(response.data?.wishes?.Wishes));
  
    } else if (response.status === 202) {
      console.log("response.dataJOINGROUP", response.data);
      dispatch(getAllWishes(response.data.wishes));
      dispatch(getProgressbar(response.data.groups));
    } else if (response.status === 201) {
      console.log("response.dataJOINGROUP", response.data);
      dispatch(getProgressbar(response.data?.wishes?.Wishes));
    } else {
      dispatch(getError(response?.data))
    }
  } catch (err) {
    dispatch(getError(err))
  }
  
};
