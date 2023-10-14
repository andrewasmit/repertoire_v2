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
