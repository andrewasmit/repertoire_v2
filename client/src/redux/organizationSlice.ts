import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ConcertProgram {
  name: string;
  concert_id: number;
  year: number | string;
  program: PerformedPiece[] | null;
}

export interface PerformedPiece {
  performance_id: number;
  piece: string;
  piece_id: number;
  ensemble: string;
  ensemble_id: number;
  concert_id?: number;
}

export interface Performance {
  id: number;
  piece_id: number;
  ensemble_id: number;
  concert_id?: number;
}

export interface OrganizationResponse {
  id: number;
  name: string;
  uuid: string;
  ensembles: Ensemble[];
  users: User[];
  pieces: Piece[];
}

interface EnsembleResponse {
  id: number;
  name: string;
  organization_id: string | number;
  grade_level: string;
}

export type ConcertResponse = {
  id: number;
  title: string;
  year: number | string;
  organization_id: number;
};

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

export interface Piece {
  id: number;
  title: string;
  composer: string;
  number_of_players: number;
  genre: string;
  difficulty: number;
  reference_recording: string;
  organization_id?: number;
  notes: Note[] | null;
}

export interface Note {
  note: string;
  id: number;
  user_id: number;
  piece_id: number;
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
      state.ensembles?.push(action.payload);
    },
    deleteEns: (state, action: PayloadAction<number>) => {
      console.log(
        `REDUX: REMOVING ENSEMBLE with ID:${action.payload} from organization`
      );

      const newEnsState: Ensemble[] = [...state.ensembles].filter(
        (ens) => ens.id !== action.payload
      );

      return {
        ...state,
        ensembles: newEnsState,
      };
    },
    editEns: (state, action: PayloadAction<EnsembleResponse>) => {
      console.log(`REDUX: UPDATING ENSEMBLE with ID:${action.payload.id}`);

      const newEns: Ensemble = {
        name: action.payload.name,
        id: action.payload.id,
        grade_level: action.payload.grade_level,
      };

      const oldState = [...state.ensembles];
      const idx = oldState.findIndex((ens) => ens.id === action.payload.id);
      oldState.splice(idx, 1, newEns);
      state.ensembles = oldState;
    },
    addNewConcert: (state, action: PayloadAction<ConcertResponse>) => {
      console.log("REDUX: Adding NEW CONCERT");

      const newConcert = {
        name: action.payload.title,
        concert_id: action.payload.id,
        year: action.payload.year,
        program: [],
      };

      state.concertPrograms?.push(newConcert);
    },
    updateConcert: (state, action: PayloadAction<ConcertResponse>) => {
      console.log(`REDUX: UPDATING ENSEMBLE with ID:${action.payload.id}`);

      const oldState = [...state.concertPrograms];
      const idx = oldState.findIndex(
        (concert) => concert.concert_id === action.payload.id
      );
      const targetConcert = oldState[idx];

      const updatedConcert = {
        ...targetConcert,
        name: action.payload.title,
        year: action.payload.year,
      };

      oldState.splice(idx, 1, updatedConcert);
      state.concertPrograms = oldState;
    },

    deleteConcert: (state, action: PayloadAction<number | string>) => {
      console.log("REDUX: DELETING CONCERT");

      const newState = [...state.concertPrograms].filter(
        (concert) => concert.concert_id !== action.payload
      );

      return {
        ...state,
        concertPrograms: newState,
      };
    },
    deletePerformance: (state, action: PayloadAction<any>) => {
      const targetConcert = [...state.concertPrograms];
      targetConcert.filter(
        (concert) => concert.concert_id === action.payload[0]
      );

      console.log(
        `REDUX: Deleting performance from ${targetConcert[0].title}.`
      );

      const newConcertProgram = targetConcert[0].program.filter(
        (perf: PerformedPiece) => perf.performance_id !== action.payload[1]
      );
      targetConcert[0].program = newConcertProgram;
    },
    addPerformance: (state, action: PayloadAction<Performance>) => {
      const newState = [...state.concertPrograms];
      const targetConcertIdx = newState.findIndex(
        (concert) => (concert.concert_id = action.payload.concert_id)
      );
      const targetEnsembleName = [...state.ensembles].filter(
        (ens) => ens.id === action.payload.ensemble_id
      )[0].name;
      const targetPieceName = [...state.library].filter(
        (piece) => piece.id === action.payload.piece_id
      )[0].title;

      console.log(
        `REDUX: Adding ${targetEnsembleName}'s performance of ${targetPieceName} to concert.`
      );

      const newPerformance = {
        ensemble: targetEnsembleName,
        ensemble_id: action.payload.ensemble_id,
        performance_id: action.payload.id,
        piece: targetPieceName,
        piece_id: action.payload.piece_id,
      };
      newState[targetConcertIdx].program.push(newPerformance);
      state.concertPrograms = newState;
    },
    addPieceToLibrary: (state, action: PayloadAction<Piece>) => {
      console.log(`REDUX: Adding ${action.payload.title} to library`);

      state.library?.push(action.payload);
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
  editEns,
  addNewConcert,
  updateConcert,
  deleteConcert,
  deletePerformance,
  addPerformance,
  addPieceToLibrary,
} = organizationSlice.actions;

export const selectOrganization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
