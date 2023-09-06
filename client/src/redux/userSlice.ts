import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface UserState {
  username: string;
  emailAddress: string;
  organizationId: number | undefined;
  isAdmin: boolean | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
  username: "",
  emailAddress: "",
  organizationId: undefined,
  isAdmin: undefined,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    signIn: (state, action: PayloadAction<UserState>) => {
      // console.log("REDUX: Signing in...");
      console.log("REDUX: ", action.payload);
      state.username = action.payload.username;
      state.emailAddress = action.payload.emailAddress;
      state.organizationId = parseInt(action.payload.emailAddress);
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { signIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
