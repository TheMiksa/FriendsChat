import { configureStore } from "@reduxjs/toolkit";
import { userReducer, userStore } from "./reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;