import axios from "axios";
import {
  ADD_USER,
  CHECK_FORM,
  GET_EXAMPLE_FORM,
  USER_OR_FORM_NOTFOUND,
} from "../types/checkFormToPersonTypes";
import { getErrorAuth } from "./errorAuth.ac";

export const getCheckedForm = (response) => ({
  type: CHECK_FORM,
  payload: response,
});

export const getCheckedUser = (response) => ({
  type: ADD_USER,
  payload: response,
});

export const getExampleForm = (value) => ({
  type: GET_EXAMPLE_FORM,
  payload: value,
});

export const userOrFormNotFound = (value) => {
  return { type: USER_OR_FORM_NOTFOUND, payload: value };
};

export const checkForm =
  (name, lname, phone, email, history) => async (dispatch) => {
    // let response = await axios.post(
    //   `http://localhost:3001/api/v1/form/addPresentRecipient`,
    //   {
    //     name,
    //     lname,
    //     phone,
    //     email,
    //   }
    // );
    const response = await fetch(
      "http://localhost:3001/api/v1/form/addPresentRecipient",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lname, phone, email }),
      }
    );
    const data = await response.json();
    console.log("я дошел сюда");
    console.log(response.status);
    if (response.status === 200) {
      dispatch(getCheckedUser(data));
    } else if (response.status === 201) {
      dispatch(getCheckedForm(data));
    } else if (response.status === 404) {
      dispatch(userOrFormNotFound(data));
      //dispatch(getExampleForm(true));
    } else if (response.status === 500) {
      dispatch(userOrFormNotFound(data));
    } else {
      dispatch(getErrorAuth("Произошла ошибка"));
    }
  };
