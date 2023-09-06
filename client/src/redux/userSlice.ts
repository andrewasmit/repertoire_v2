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
      // console.log("REDUX: Signing in...");
      console.log("REDUX: Payload", action.payload);
      console.log("REDUX: Current status of State", state.user);
      state.user = action.payload;
    },
  },
});

export const { signIn } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
