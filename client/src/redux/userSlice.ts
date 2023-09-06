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

interface initialState {
  user: UserState | null;
}

export const initialState: initialState = {
  user: null,
};

// const initialUserState: UserState = {
//   username: "",
//   emailAddress: "",
//   organizationId: undefined,
//   isAdmin: undefined,
// };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    signIn: (state, action: PayloadAction<UserState>) => {
      console.log(`REDUX: ${action.payload.username} is now signed in.`);
      state.user = action.payload;
    },
    signOut: (state) => {
      console.log(`REDUX: ${state.user?.username} has signed out.`);
      state.user = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
