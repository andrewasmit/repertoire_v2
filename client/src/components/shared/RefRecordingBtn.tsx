// External Dependencies
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props{
  link?: string;
}

function RefRecordingBtn({ link }: Props) {

  if(link){
    return (
      <a href={link} target="_blank">
        <YouTubeIcon >Reference Recording</YouTubeIcon>
      </a>
    )
  }

  return (
    <AddCircleIcon />
  )
  
}

export default RefRecordingBtn