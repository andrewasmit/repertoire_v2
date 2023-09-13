import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import fetchedLibrarySlice from "./fetchedLibrarySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    fetchedLibrary: fetchedLibrarySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
