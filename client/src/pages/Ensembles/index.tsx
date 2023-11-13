// External Depencies
import { useMemo } from "react";

// Internal Depencies
import EnsembleCard from "./components/EnsembleCard";
import { useAppSelector } from "../../redux/hooks";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import NewEnsembleForm from "./Add/NewEnsembleForm";
import { useIsOpen } from "../../hooks/useIsOpen";

// Local Depencies

function Ensembles() {

  const { ensembles, organization } = useAppSelector(state=>state.organization);
  const theme = useTheme();
  const { 
    isOpen: isNewEnsFormOpen, 
    handleClose: handleCloseNewEnsForm, 
    handleOpen: handleOpenNewEnsForm 
  } = useIsOpen();

  const ensembleCards = useMemo(()=>{
    return ensembles?.map(ens=>{
      return <EnsembleCard 
                id={ens.id} 
                key={ens.id} 
                name={ens.name} 
                grade={ens.grade_level} 
              />
    });
  }, [ensembles])

  const btnStyles = {
    marginTop: 3,
    border: `${theme.palette.info.main} 1px solid`,
    ':hover':{
      color: theme.palette.primary.main,
      bgcolor: theme.palette.info.main,
      border: `${theme.palette.secondary.main} 1px solid`,
    }
  };

  const gridStyles = {
    background: `url(${"../../../public/concert-hall.jpg"}) no-repeat center center/cover`,
    opacity: 0.9,
    height: '100vh',
    marginBottom: '70px',
    overflow: 'auto'
  }

  return (
    <Box className="ens-page" sx={gridStyles}>
      <Box 
        sx={{ 
          background: theme.palette.primary.main, 
          color: theme.palette.secondary.main,
          opacity:0.95,
          padding: 5,
          }} 
        >
        <Typography 
          variant="h3" 
          sx={{ marginTop: 0, padding: 1, color: theme.palette.info.main }}
        >
          {organization?.name}
        </Typography>

        <Typography variant="h4">
          Ensembles
        </Typography>

        <Button 
          onClick={handleOpenNewEnsForm} 
          variant="contained" 
          color="secondary" 
          sx={btnStyles}
        >
          Add New Ensemble
        </Button>
      </Box>

      <Grid 
        container 
        spacing={3} 
      >
        {ensembleCards}
      </Grid>

      <NewEnsembleForm 
        isOpen={isNewEnsFormOpen}
        handleClose={handleCloseNewEnsForm}
      />
    </Box>
  );
}

export default Ensembles;
