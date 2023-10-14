// External Dependencies
import { Typography } from "@mui/material"

// Internal Dependencies
import { PerformedPiece } from "../../../redux/organizationSlice"



function Performance({ performance_id, piece, piece_id, ensemble, ensemble_id }: PerformedPiece) {
  return (
    <div>
      <Typography >{piece}</Typography>
    </div>
  )
}

export default Performance