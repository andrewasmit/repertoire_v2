// External Dependencies
import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

// Internal Dependencies
import RefRecordingBtn from "../../components/shared/RefRecordingBtn";
import { getDifficultyString } from "../../utils/getDifficultyString";


export const useColumns = (): GridColDef[] => {
  return [
    {
      field: "composer",
      headerName: "Composer",
      width: 160,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 100,
    },
    {
      field: "number_of_players",
      headerName: "# of Players",
      type: "number",
      width: 120,
      valueFormatter: (params: GridValueFormatterParams<string | number>) => {
        if(params.value == 0){
          return ""
        } else
        return params.value;
      },
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      type: "number",
      width: 170,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        return getDifficultyString(params.value);
      },
    },
    {
      field: "reference_recording",
      headerName: "Reference Recording",
      sortable: false,
      width: 180,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        return <RefRecordingBtn link={params.value} id={params.row.id} />
      },
    },
  ];
};


export const useGetDifficultyOptions = ()=>{
  const difficultyRange = [1,2,3,4,5];

  return difficultyRange.map(d=>{
    return <option value={d}>
            {getDifficultyString(d)}
          </option>
  })
}

export const useGetNumberOfPlayerOptions = ()=>{
  const numberOfPlayersRange = [1,2,3,4,5,6,7,8,9,10,11,"12+"];

  return numberOfPlayersRange.map(num=>{
    return <option value={num}>
            {num}
          </option>
  })
}