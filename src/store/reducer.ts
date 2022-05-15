import { store } from "./store"
import { Action } from "./types";

export const userStore = {
  userName: '',
};
export const userReducer = (store = userStore, action: Action) => {
  switch(action.type) {
    case 'LOG_IN': {
      const { userName } = action.payload;

    return {
      ...store,
      userName,
    };
    }
    default:
      return {
        ...store,
      };
  }
};