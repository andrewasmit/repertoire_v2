// External Depencies
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import EnsembleCard from "./components/EnsembleCard";
import { useAppSelector } from "../../redux/hooks";
import { Box, Button, Typography, useTheme } from "@mui/material";
// import { useAppDispatch } from "../../redux/hooks";

// Local Depencies

function Ensembles() {

  const { ensembles, organization } = useAppSelector(state=>state.organization);
  const navigate = useNavigate();
  const theme = useTheme();

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

  const handleAddEnsClick = useCallback(()=>{
    navigate('/ensembles/new');
  }, []);

  const btnStyles = {
    marginTop: 3,
    ':hover':{
      color: theme.palette.primary.main,
      bgcolor: theme.palette.info.main
    }
  };


  return (
    <Box className="ens-page" sx={{ background: '#fff' }}>
      <Box 
        className="ens-header" 
        sx={{ 
          background: theme.palette.primary.main, 
          color: theme.palette.secondary.main,
          padding: 5,
          }} 
        >
        <Typography 
          variant="h3" 
          sx={{ marginTop: 0, padding: 1, color: theme.palette.info.main }}
        >
          {organization?.name}
        </Typography>

        <Typography variant="h5">
          Here are the ensembles currently in your organization
        </Typography>

        <Button 
          onClick={handleAddEnsClick} 
          variant="contained" 
          color="secondary" 
          sx={btnStyles}
        >
          Add New Ensemble
        </Button>
      </Box>

      <div id="ens-card-container">
        {ensembleCards}
      </div>
    </Box>
  );
}

export default Ensembles;
