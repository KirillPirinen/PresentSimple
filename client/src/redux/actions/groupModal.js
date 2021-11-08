import { ALL_WISHES_PERSON, BIND_ALONE, CREATE_GROUP } from "../types/groupModalTypes";
import axios from "axios";
import { getProgressbar } from "./Progressbar.ac";
import { getError, getInfo } from "./error.ac";
import customFetch from "../../custom/customFetch";
import initPoints from "../../config/endPoints";

export const getAllWishes = (payload) => {
  return { type: ALL_WISHES_PERSON, payload };
};

export const getWishesPersonWatchPeople = (user_id) => async (dispatch) => {
  const {data, status} = await customFetch(dispatch, initPoints.getPersonWishes(user_id), 
    {credentials:"include"})
    if(status === 200) dispatch(getAllWishes(data));
};

export const addAlone = (wish_id) => async (dispatch) => {
  const {data, status} = await customFetch(dispatch, initPoints.addAlone, {
    method:"PATCH", credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({wish_id})
  })
   if(status === 200) dispatch({type:BIND_ALONE, payload:wish_id})
};

export const addGroup = (maxusers, telegram, wish_id) => async (dispatch) => {
 const {status, data} = await customFetch(dispatch, initPoints.createGroup, {
   method:"POST",
   credentials:'include',
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify( {
    maxusers,telegram,wish_id
  })
 })
    if (status === 200) {
      dispatch({type:CREATE_GROUP, payload:data.group})
      console.log(data)
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
