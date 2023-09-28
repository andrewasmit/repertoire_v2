import { ConcertProgram, PerformedPiece } from "../redux/organizationSlice";

export const findEnsemblePerformances: (
  id: number,
  concerts: ConcertProgram[]
) => PerformedPiece[] = (id: number, concerts: ConcertProgram[]) => {
  const ensPerformances: PerformedPiece[] = [];

  concerts.forEach((concert) => {
    concert.program?.forEach((performance) => {
      if (performance.ensemble_id === id) {
        ensPerformances.push(performance);
      }
    });
  });

  return ensPerformances;
};
