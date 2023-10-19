// External Dependencies
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props{
  link?: string;
  id: string;
}

function RefRecordingBtn({ link, id }: Props) {
  const navigate = useNavigate();

  const handleNavToAddReference = useCallback(()=>{
    console.log(`Piece w/ ID of ${id} was clicked to add a reference recording.`)
    navigate('/home')
  },[]);


  if(link){
    return (
      <Box sx={{ margin: 'auto' }} >
        <a href={link} target="_blank">
          <YouTubeIcon >Reference Recording</YouTubeIcon>
        </a>
      </Box>
    )
  }

  return (
    <IconButton onClick={handleNavToAddReference} sx={{ margin: 'auto' }} >
      <AddCircleIcon />
    </IconButton>
  )
  
}

export default RefRecordingBtn