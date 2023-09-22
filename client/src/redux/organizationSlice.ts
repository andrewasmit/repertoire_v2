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
  pieces: Piece[];
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

interface Piece {
  id: number;
  title: string;
  composer: string;
  number_of_players: number;
  genre: string;
  difficulty: number;
  reference_recording: string;
}

const initialState: {
  concertPrograms: ConcertProgram[] | null;
  ensembles: Ensemble[] | null;
  organization: Organization | null;
  users: User[] | null;
  library: Piece[] | null;
} = {
  concertPrograms: null,
  ensembles: null,
  organization: null,
  users: null,
  library: null,
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    hydrateConcertPrograms: (
      state,
      action: PayloadAction<ConcertProgram[]>
    ) => {
      console.log("REDUX: Hydrating CONCERTS for organization");
      state.concertPrograms = action.payload;
    },
    hydrateEnsembles: (state, action: PayloadAction<Ensemble[]>) => {
      console.log("REDUX: Hydrating ENSMEBLES for organization");
      state.ensembles = action.payload;
    },
    hydrateOrganization: (state, action: PayloadAction<Organization>) => {
      console.log("REDUX: Hydrating ORGANIZATION Data");
      state.organization = action.payload;
    },
    hydrateUsers: (state, action: PayloadAction<User[]>) => {
      console.log("REDUX: Hydrating USERS for organization");
      state.users = action.payload;
    },
    hydrateLibrary: (state, action: PayloadAction<Piece[]>) => {
      console.log("REDUX: Hydrating MUSIC LIBRARY for organization");
      state.library = action.payload;
    },
  },
});

export const {
  hydrateConcertPrograms,
  hydrateEnsembles,
  hydrateOrganization,
  hydrateUsers,
  hydrateLibrary,
} = organizationSlice.actions;

export const selectOrganization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
