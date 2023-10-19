// External Dependencies


// Internal Dependencies
import { Note } from "../../../redux/organizationSlice"



function Note({ id, piece_id, user_id, note }: Note) {
  return (
    <div>
      <h2>{note}</h2>
    </div>
  )
}

export default Note