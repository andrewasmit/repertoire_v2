import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ConcertProgram {
  name: string;
  concert_id: number;
  year: number;
  program: PerformedPiece[] | null;
}

export interface PerformedPiece {
  performance_id: number;
  piece: string;
  ensemble: string;
  ensemble_id: number;
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

export interface Ensemble {
  id: number;
  name: string;
  grade_level: string;
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
    addNewEns: (state, action: PayloadAction<Ensemble>) => {
      console.log("REDUX: Adding NEW ENSEMBLE to organization");
      // const newEnsState = state.ensembles?.push(action.payload);
      // return {
      //   ...state,
      //   ensembles: newEnsState,
      // };
      state.ensembles?.push(action.payload);
    },
    deleteEns: (state, action: PayloadAction<number>) => {
      console.log(
        `REDUX: REMOVING ENSEMBLE with ID:${action.payload} from organization`
      );
      // state.ensembles = state.ensembles?.push(action.payload);
      const newEnsState = [...state.ensembles].filter(
        (ens) => ens.id !== action.payload
      );
      // const newEnsState = state.ensembles?.filter(
      //   (ens) => ens.id !== action.payload
      // );
      return {
        ...state,
        ensembles: newEnsState,
      };
    },
    addNewConcert: (state, action: PayloadAction<ConcertProgram>) => {
      console.log("REDUX: Adding NEW CONCERT");
      state.concertPrograms?.push(action.payload);
    },
    deleteConcert: (state, action: PayloadAction<number | string>) => {
      console.log("REDUX: DELETING CONCERT");
      // state.ensembles = state.ensembles?.push(action.payload);
      const newState = [...state.concertPrograms].filter(
        (concert) => concert.concert_id !== action.payload
      );
      return {
        ...state,
        concertPrograms: newState,
      };
    },
  },
});

export const {
  hydrateConcertPrograms,
  hydrateEnsembles,
  hydrateOrganization,
  hydrateUsers,
  hydrateLibrary,
  addNewEns,
  deleteEns,
  addNewConcert,
  deleteConcert,
} = organizationSlice.actions;

export const selectOrganization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
