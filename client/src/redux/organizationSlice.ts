import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ConcertProgram {
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

const initialState: { concertPrograms: ConcertProgram[] | null } = {
  concertPrograms: null,
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
  },
});

export const { hydrateConcertPrograms } = organizationSlice.actions;

export const selectOrganization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
