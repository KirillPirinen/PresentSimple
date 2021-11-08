import { SHOW_PROGRESSBAR, DELETE_PROGRESSBAR } from "../types/progressbarTypes";

export const getProgressbar = (payload) => {
  return { type: SHOW_PROGRESSBAR, payload};
};

export const deleteProgressbar = (payload) => {
  return { type: DELETE_PROGRESSBAR, payload};
};
