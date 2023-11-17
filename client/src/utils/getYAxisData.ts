import { Piece } from "../redux/organizationSlice";

interface Props {
  pieces: Piece[];
}
export const getYAxisData = ({ pieces }: Props) => {
  const dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < pieces.length; i++) {
    const targetNum = pieces[i].number_of_players - 1;
    dataArr[targetNum]++;
  }

  return dataArr;
};
