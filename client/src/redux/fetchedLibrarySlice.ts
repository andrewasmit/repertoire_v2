import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface FetchedPiece {
  arranger: string | null;
  audio_link: string | null;
  category: string;
  compilation: string | null;
  composer: string;
  description: string | null;
  difficulty_level_id: number | null;
  duration: string | null;
  id: number;
  instrumentation: string | null;
  level: string | null;
  maximum_players: number | null;
  minimum_players: number | null;
  publisher: string | null;
  publisher_link: string | null;
  reviews: string | null;
  state_lists: string | null;
  title: string;
  video_link1: string | null;
}

// export interface UserResponse {
//   username: string;
//   email_address: string;
//   organization_id: number | undefined;
//   is_admin: boolean | undefined;
// }

const initialState: {
  fetchedEnsembles: FetchedPiece[] | null;
  fetchedSolos: FetchedPiece[] | null;
} = {
  fetchedEnsembles: null,
  fetchedSolos: null,
};

export const fetchedLibrarySlice = createSlice({
  name: "fetchedLibrary",
  initialState,
  reducers: {
    hydrateEnsembles: (state, action: PayloadAction<FetchedPiece[]>) => {
      console.log(`REDUX: Hydrating Ensembles.`);
      state.fetchedEnsembles = action.payload;
    },
    hydrateSolos: (state, action: PayloadAction<FetchedPiece[]>) => {
      console.log(`REDUX: Hydrating Solos.`);
      state.fetchedSolos = action.payload;
    },
  },
});

export const { hydrateEnsembles, hydrateSolos } = fetchedLibrarySlice.actions;

export const selectFetchedEnsembles = (state: RootState) =>
  state.fetchedLibrary;

export default fetchedLibrarySlice.reducer;
