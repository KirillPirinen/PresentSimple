import axios from "axios";
import { CHECK_FORM, GET_EXAMPLE_FORM } from "../types/checkFormToPersonTypes";
import { getError } from "./error.ac";

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
      dispatch({
        type: CHECK_FORM,
        payload: response.data,
      });
      history.replace(`/mywishlist/${phone}`);
    } else if (response.status === 201) {
      dispatch({
        type: CHECK_FORM,
        payload: response.data,
      });
      dispatch({
        type: GET_EXAMPLE_FORM,
      });
    } else {
      dispatch(getError("Произошла ошибка"));
    }
  };
