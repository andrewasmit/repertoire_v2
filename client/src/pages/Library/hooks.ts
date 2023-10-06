// External Dependencies
import { GridColDef } from "@mui/x-data-grid";

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
      width: 105,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      type: "number",
      width: 80,
    },
    {
      field: "reference_recording",
      headerName: "Reference Recording",
      // type: "number",
      width: 250,
    },
    // {
    // field: "difficulty",
    // headerName: "Difficulty",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];
};
