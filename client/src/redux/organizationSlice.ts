import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ConcertProgram {
  name: string;
  concert_id: number;
  year: number;
  program: PerformedPiece[] | null;
}

interface PerformedPiece {
  performance_id: number;
  piece: string;
  ensemble: string;
}

export interface OrganizationResponse {
  id: number;
  name: string;
  uuid: string;
  ensembles: Ensemble[];
  users: User[];
}
interface Organization {
  id: number;
  name: string;
  uuid: string;
}

interface Ensemble {
  id: number;
  name: string;
  gradeLevel: string;
}

interface User {
  id: number;
  username: string;
  emailAddress: string;
  isAdmin: boolean;
}

const initialState: {
  concertPrograms: ConcertProgram[] | null;
  ensembles: Ensemble[] | null;
  organization: Organization | null;
  users: User[] | null;
} = {
  concertPrograms: null,
  ensembles: null,
  organization: null,
  users: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    hydrateConcertPrograms: (
      state,
      action: PayloadAction<ConcertProgram[]>
    ) => {
      console.log(`REDUX: Hydrating concert programs for organization`);
      state.concertPrograms = action.payload;
    },
    hydrateEnsembles: (state, action: PayloadAction<Ensemble[]>) => {
      console.log(`REDUX: Hydrating ensembles for organization`);
      state.ensembles = action.payload;
    },
    hydrateOrganization: (state, action: PayloadAction<Organization>) => {
      console.log(`REDUX: Hydrating organization data`);
      state.organization = action.payload;
    },
    hydrateUsers: (state, action: PayloadAction<User[]>) => {
      console.log(`REDUX: Hydrating organization data`);
      state.users = action.payload;
    },
  },
});

export const {
  hydrateConcertPrograms,
  hydrateEnsembles,
  hydrateOrganization,
  hydrateUsers,
} = organizationSlice.actions;

export const selectOrganization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
