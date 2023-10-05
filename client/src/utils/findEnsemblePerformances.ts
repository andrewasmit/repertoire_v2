import { ConcertProgram, PerformedPiece } from "../redux/organizationSlice";

type EnsemblePerformances = {
  performance: PerformedPiece;
  name: string;
  concertId: number;
  year: number;
};

export const findEnsemblePerformances: (
  id: number,
  concerts: ConcertProgram[]
) => EnsemblePerformances[] = (id: number, concerts: ConcertProgram[]) => {
  const ensPerformances: EnsemblePerformances[] = [];

  concerts.forEach((concert) => {
    concert.program?.forEach((performance) => {
      if (performance.ensemble_id === id) {
        ensPerformances.push({
          performance: performance,
          name: concert.name,
          concertId: concert.concert_id,
          year: concert.year,
        });
      }
    });
  });

  return ensPerformances;
};
