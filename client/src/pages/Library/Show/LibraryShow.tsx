// External Dependencies 

// Internal Dependencies
import { useMemo } from "react";
import { Piece } from "../../../redux/organizationSlice";
import { getDifficultyString } from "../../../utils/getDifficultyString";
import NoteCard from "./NoteCard";

// composer, difficulty, genre, id, # of players, orgId, reference Recording, title, notes

// Local Typings
interface PieceProps{
  piece: Piece;
}

// Component Definition
function LibraryShow({ piece }: PieceProps) {

  const difficulty = useMemo(()=>{
    return getDifficultyString(piece.difficulty);
  }, [piece]);

  const notesToDisplay = piece.notes?.map(note=>{
    return <NoteCard id={note.id} key={note.id} piece_id={note.piece_id} user_id={note.user_id} note={note.note} />
  })

  return (
    <>
      <div>This page will show info about a specific piece</div>
      <h1>{piece.title}</h1>
      <h3>{piece.composer}</h3>

      <h3>{piece.genre}</h3>

      <h4>Difficulty: {difficulty}</h4>
      <h4>Number of Players: {piece.number_of_players}</h4>
      
      {notesToDisplay}
      
      <a href={piece.reference_recording} target="__blank" >Reference Recording</a>
    </>
  )
}

export default LibraryShow;