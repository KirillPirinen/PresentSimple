import { ERROR, CLEAR_ERROR } from "../types/errorTypes";

export const getError = (value) => ({
  type: ERROR,
  payload: value,
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
