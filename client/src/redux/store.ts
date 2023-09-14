//External Dependencies
import { configureStore } from "@reduxjs/toolkit";

//Internal Dependencies
import userSlice from "./userSlice";
import fetchedLibrarySlice from "./fetchedLibrarySlice";
import organizationSlice from "./organizationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    fetchedLibrary: fetchedLibrarySlice,
    organization: organizationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
