import { ERROR, CLEAR_ERROR, CLEAR_INFO, INFO } from "../types/errorTypes";

export const getError = (value) => ({
  type: ERROR,
  payload: value,
});

export const clearError = () => ({
  type: CLEAR_ERROR
});

export const getInfo = (value) => ({
  type: INFO,
  payload: value,
});

export const clearInfo = () => ({
  type: CLEAR_INFO
});
