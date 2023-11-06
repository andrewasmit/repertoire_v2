// External Dependencies
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';


interface EnsembleCardProps{
  id: number,
  name: string,
  grade: string
}

const EnsembleCard: FC<EnsembleCardProps> = ({
  name, grade, id
})=>{

  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavToShowPage = useCallback(()=>{
    navigate(`/ensembles/${id}`)
  }, [id]);
  
  const styles={
    marginTop: 3,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    width: '250px',
    height: '200px',
    // minWidth: '397px',
    padding: 2,
    margin: 10,
    border: `${theme.palette.info.main} 1px solid`,
    borderRadius: 3,
    ':hover':{
      color: theme.palette.primary.main,
      bgcolor: theme.palette.info.main,
      border: `${theme.palette.primary.main} 1px solid`,
      cursor: 'pointer',
    },
    ':active':{
      cursor: 'grab',
      opacity: 0.8
    }
  };

  return (
    <Grid item xs={12} md={6} lg={4} xl={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Box 
        component='div'
        className='ens-card' 
        sx={styles}
        onClick={handleNavToShowPage}
      >
        <Typography variant='h5' sx={{ padding: '15px 30px' }} >{name}</Typography>

        <Divider light={true} />

        <Typography variant='body1' sx={{ padding: '10px 20px' }}>{grade}th grade</Typography>
      </Box>
    </Grid>
  )
}

export default EnsembleCard