// External Dependencies 
import { useCallback, useMemo } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";

// Internal Dependencies
import { Piece } from "../../../redux/organizationSlice";
import { getDifficultyString } from "../../../utils/getDifficultyString";
import { useAppSelector } from "../../../redux/hooks";
import { findPerformances } from "../../../utils/findPerformances";
import { useIsOpen } from "../../../hooks/useIsOpen";

// Local Dependencies
import NoteCard from "./NoteCard";
import PerformanceCard from "./PerformanceCard";
import AddNewNoteForm from "./NewNoteForm";
import YoutubeEmbed from "../../../components/YoutubeVideo/YoutubeVideo";

// Local Typings
interface PieceProps{
  piece: Piece;
}

// Component Definition
function LibraryShow({ piece }: PieceProps) {

  const { concertPrograms } = useAppSelector(state=>state.organization);
  const { currentUser } = useAppSelector(state=>state.user);
  const { isOpen: isPerformancesOpen, toggleIsOpen: togglePerformances} = useIsOpen();
  const { 
    isOpen: isNewNoteOpen, 
    handleClose: handleCloseNewNote, 
    handleOpen: handleOpenNewNote, 
    toggleIsOpen: toggleNewNote
  } = useIsOpen();

  const difficulty = useMemo(()=>{
    return getDifficultyString(piece.difficulty);
  }, [piece]);

  const notesToDisplay = useMemo(()=>{
    if(piece.notes){
      return piece?.notes.map(note=>{
        return <NoteCard 
                  id={note.id} 
                  key={note.id} 
                  piece_id={note.piece_id} 
                  user_id={note.user_id} 
                  note={note.note} 
                />
      })
    } else return [];
  },[piece]);


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

  

  return (
    <>
      <Typography variant="h1" >{piece.title}</Typography>
      <Typography variant="h3" >{piece.composer}</Typography>
      <Typography variant="h5" >Genre: {piece.genre}</Typography>
      <Typography variant="h5" >Difficulty: {difficulty}</Typography>
      <Typography variant="h5" >Number of Players: {piece.number_of_players}</Typography>
      
      {notesToDisplay.length > 0 ? 
        <Box component={'div'}>
          <Typography variant="h4" >Notes about {piece.title}</Typography>
          {notesToDisplay}
        </Box> : 
        <Box component={'div'} sx={{ marginTop: 4 }}>
          <Typography variant="h5" >There are currently no notes about {piece.title}</Typography>
        </Box>
      }

      <Button onClick={toggleNewNote}>
        {isNewNoteOpen ? "Discard New Note" : "Add New Note" }
      </Button>

      {isNewNoteOpen &&
        <AddNewNoteForm 
          handleClose={handleCloseNewNote} 
          pieceId={piece.id} 
          userID={currentUser?.id}
        />
      }

      {performancesToDisplay.length === 0 && 
        <Typography variant="h4" >{piece.title} has not been performed yet</Typography> 
      }

      {performancesToDisplay.length > 1 && 
        <Box>
          <Button onClick={togglePerformances}>
            { isPerformancesOpen ? 'Hide Performances' : "Show More Performances" }
          </Button>

          <Box component={'div'} >
            <Typography variant="h6" >Most recent performance of {piece.title}:</Typography>
            { performancesToDisplay[0] }
          </Box>
          
          <Collapse in={isPerformancesOpen}>
            {performancesToDisplay.slice(1)}
          </Collapse>
        </Box>
      }

      {/* <YoutubeEmbed url={piece.reference_recording}/> */}

      <a href={piece.reference_recording} target="__blank" >Reference Recording</a>
    </>
  )
}

export default LibraryShow;


{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/zN_wLoILpu8?si=pZv-0N5-drEnEdaV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}