// External Dependencies 

// Internal Dependencies
import { useMemo } from "react";
import { Piece } from "../../../redux/organizationSlice";
import { getDifficultyString } from "../../../utils/getDifficultyString";

// composer, difficulty, genre, id, # of players, orgId, reference Recording, title

// Local Typings
interface PieceProps{
  piece: Piece;
}

// Component Definition
function LibraryShow({ piece }: PieceProps) {

  const difficulty = useMemo(()=>{
    return getDifficultyString(piece.difficulty);
  }, [piece]);

  return (
    <>
      <div>This page will show info about a specific piece</div>
      <h1>{piece.title}</h1>
      <h3>{piece.composer}</h3>

      <h3>{piece.genre}</h3>

      <h4>Difficulty: {difficulty}</h4>
      <h4>Number of Players: {piece.number_of_players}</h4>
      
      <a href={piece.reference_recording} target="__blank" >Reference Recording</a>
    </>
  )
}

export default LibraryShow;