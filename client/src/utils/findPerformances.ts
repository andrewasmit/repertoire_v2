import {
  ConcertProgram,
  Piece,
  PerformedPiece,
} from "../redux/organizationSlice";

type PiecePerformances = {
  performance: PerformedPiece;
  name: string;
  concertId: number;
  year: number | string;
};

export const findPerformances = (
  piece: Piece,
  concerts: ConcertProgram[] | null
) => {
  const performances: PiecePerformances[] = [];

  concerts?.forEach((concert) => {
    concert.program?.forEach((performance) => {
      if (performance.piece_id === piece.id) {
        performances.push({
          performance: performance,
          name: concert.name,
          concertId: concert.concert_id,
          year: concert.year,
        });
      }
    });
  });

  return performances;
};
