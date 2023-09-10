import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  username: string;
  emailAddress: string;
  organizationId: number | undefined;
  isAdmin: boolean | undefined;
}

export interface UserResponse {
  username: string;
  email_address: string;
  organization_id: number | undefined;
  is_admin: boolean | undefined;
}

const initialState: { currentUser: UserState | null } = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserResponse>) => {
      console.log(`REDUX: ${action.payload.username} is now signed in.`);
      // console.log("PAYLOAD: ", action.payload);
      state.currentUser = <UserState>{
        username: action.payload.username,
        emailAddress: action.payload.email_address,
        organizationId: action.payload.organization_id,
        isAdmin: action.payload.is_admin,
      };
    },
    signOut: (state) => {
      console.log(`REDUX: ${state.currentUser?.username} has signed out.`);
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
