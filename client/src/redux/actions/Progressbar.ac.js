import { SHOW_PROGRESSBAR } from "../types/progressbarTypes";

export const getProgressbar = (value) => {
  return { type: SHOW_PROGRESSBAR, payload: value };
};

export const deleteProgressbar = () => {
  return { type: SHOW_PROGRESSBAR };
};
