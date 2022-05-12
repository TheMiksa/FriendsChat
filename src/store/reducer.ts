import { store } from "./store"

export const userStore = {
  userName: '',
  userId: '',
};
export const userReducer = (store = userStore, action) => {
  switch(action.type) {
    case 'SET_USER': {
      const { userId, userName } = action.payload;

    return {
      ...store,
      userId,
      userName,
    };
    }
    default:
      return {
        ...store,
      };
  }
};