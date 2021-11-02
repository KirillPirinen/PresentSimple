import { SHOW_PROGRESSBAR, DELETE_PROGRESSBAR } from "../types/progressbarTypes";

export const getProgressbar = (value) => {
  return { type: SHOW_PROGRESSBAR, payload: value };
};

export const deleteProgressbar = (id) => {
  return { type: DELETE_PROGRESSBAR, payload: id };
};
