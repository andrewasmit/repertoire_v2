import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  username: string;
  emailAddress: string;
  organizationId: number | undefined;
  isAdmin: boolean | undefined;
  id: number;
}

export interface UserResponse {
  username: string;
  email_address: string;
  organization_id: number | undefined;
  is_admin: boolean | undefined;
  id: number;
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
      state.currentUser = <UserState>{
        username: action.payload.username,
        emailAddress: action.payload.email_address,
        organizationId: action.payload.organization_id,
        isAdmin: action.payload.is_admin,
        id: action.payload.id,
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
