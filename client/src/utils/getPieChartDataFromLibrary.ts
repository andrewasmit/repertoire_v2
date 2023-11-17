// Internal Dependencies
import { Piece } from "../redux/organizationSlice";

// Local Dependencies
import { getDifficultyString } from "./getDifficultyString";

interface Props {
  pieces: Piece[];
}

interface DataItem {
  id: number;
  label: string | null;
  value: number;
}

export const getPieChartDataFromLibrary = ({ pieces }: Props) => {
  const totalOfEachDifficulty = [0, 0, 0, 0, 0];
  const data: DataItem[] = [];

  pieces.forEach((piece) => {
    totalOfEachDifficulty[piece.difficulty - 1]++;
  });

  totalOfEachDifficulty.forEach((difficulty, idx) => {
    if (difficulty > 0) {
      data.push({
        id: idx,
        value: difficulty,
        label: getDifficultyString(idx + 1),
      });
    }
  });

  return data;
};
