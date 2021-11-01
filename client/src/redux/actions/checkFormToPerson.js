import axios from "axios";
import { CHECK_FORM, GET_EXAMPLE_FORM, SHOW_ANSWER_FROM_BACK } from "../types/checkFormToPersonTypes";
import { getError } from "./error.ac";

export const getCheckedForm = (response) => ({
  type: CHECK_FORM,
  payload: response,
});

export const getExampleForm = (value) => ({
  type: GET_EXAMPLE_FORM,
  payload: value,
});

export const showAnswerFromBack = (value) => ({
  type: SHOW_ANSWER_FROM_BACK,
  payload: value,
})

export const checkForm =
  (name, lname, phone, email, history) => async (dispatch) => {
    let response = await axios.post(
      `http://localhost:3001/api/v1/form/addPresentRecipient`,
      {
        name,
        lname,
        phone,
        email,
      }
    );
    if (response.status === 200) {
      dispatch(getCheckedForm(response.data));
      history.replace(`/mywishlist/${phone}`);
    } else if (response.status === 201) {
      dispatch(getCheckedForm(response.data));
      dispatch(getExampleForm(true));
    } else {
      dispatch(getError("Произошла ошибка"));
    }
  };

  export const sendFormToPerson = (person) => async (dispatch) => {
    console.log('зашли в action')
    let response = await axios.post(`http://localhost:3001/api/v1/form/sendFormToPresentRecipient`, {person})
    console.log('response.data', response.data)
  if (response.status === 200) {
    dispatch(showAnswerFromBack(true));
  }
}
