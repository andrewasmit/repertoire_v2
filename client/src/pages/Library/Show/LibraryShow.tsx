// External Dependencies 
import { useMemo } from "react";
import { Button, Collapse } from "@mui/material";

// Internal Dependencies
import { Piece } from "../../../redux/organizationSlice";
import { getDifficultyString } from "../../../utils/getDifficultyString";
import { useAppSelector } from "../../../redux/hooks";
import { findPerformances } from "../../../utils/findPerformances";
import { useIsOpen } from "../../../hooks/useIsOpen";

// Local Dependencies
import NoteCard from "./NoteCard";
import PerformanceCard from "./PerformanceCard";

// Local Typings
interface PieceProps{
  piece: Piece;
}

// Component Definition
function LibraryShow({ piece }: PieceProps) {

  const { ensembles, concertPrograms } = useAppSelector(state=>state.organization);
  const { isOpen: isPerformancesOpen, toggleIsOpen: togglePerformances} = useIsOpen();

  const difficulty = useMemo(()=>{
    return getDifficultyString(piece.difficulty);
  }, [piece]);

  const notesToDisplay = piece.notes?.map(note=>{
    return <NoteCard id={note.id} key={note.id} piece_id={note.piece_id} user_id={note.user_id} note={note.note} />
  });

  const performancesToDisplay = useMemo(()=>{
    const allPerformances = findPerformances(piece, concertPrograms)

    return allPerformances.map(perf=>{
      return <PerformanceCard 
                concertId={perf.concertId} 
                name={perf.name} 
                performance={perf.performance}
                year={perf.year}
             />
    })
  },[concertPrograms, piece]);


  // const performanceToDisplay = useMemo(()=>{
  //   return performances
  // }, [performances]);

  return (
    <>
      <div>This page will show info about a specific piece</div>
      <h1>{piece.title}</h1>
      <h3>{piece.composer}</h3>

      <h3>{piece.genre}</h3>

      <h4>Difficulty: {difficulty}</h4>
      <h4>Number of Players: {piece.number_of_players}</h4>
      
      {notesToDisplay.length > 0 && 
        <div>
          <h2>Notes about {piece.title}</h2>
          {notesToDisplay}
        </div>
      }

      <h2>Last performance of {piece.title}</h2>
      { performancesToDisplay[0] }

      {performancesToDisplay.length > 1 && 
        <div>
          <Button onClick={togglePerformances}>
            { isPerformancesOpen ? 'Hide Performances' : "Show All Performances" }
          </Button>
          <Collapse in={isPerformancesOpen}>
            {performancesToDisplay}
          </Collapse>
        </div>
      }

      <a href={piece.reference_recording} target="__blank" >Reference Recording</a>
    </>
  )
}

export default LibraryShow;