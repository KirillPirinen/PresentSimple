import { ERROR_AUTH, CLEAR_ERROR_AUTH } from "../types/errorAuthTypes";

export const getErrorAuth = (value) => ({
  type: ERROR_AUTH,
  payload: value,
});

export const clearErrorAuth = () => ({
  type: CLEAR_ERROR_AUTH
});
