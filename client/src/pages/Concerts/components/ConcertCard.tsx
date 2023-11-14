// External Dependencies
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { Box, List, ListItem, Typography, useTheme } from "@mui/material";

// Internal Dependencies
import { PerformedPiece } from "../../../redux/organizationSlice"
import { useAppSelector } from "../../../redux/hooks";

type ConcertCardParams = {
  year: number | string;
  id: number;
  name: string;
  program: PerformedPiece[] | null;
}

function ConcertCard({ year, id, name, program }: ConcertCardParams) {

  const navigate = useNavigate();
  const { ensembles } = useAppSelector(state=>state.organization);
  const theme = useTheme();

  const handleNavToShowPage = useCallback((): void=>{
    navigate(`/concerts/${id}`);
  }, []);

  const performingEnsembles = useMemo(()=>{
    const allPerformanceEnsembleIds = program?.map(performance=>{
      return performance.ensemble_id;
    });

    const ensembleIds = [...new Set(allPerformanceEnsembleIds)];

    return ensembleIds.map(ensId=>{
      return ensembles?.find(ens=>ens.id === ensId);
    });

  }, [program, ensembles]);

  const performingEnsemblesToDisplay = performingEnsembles?.map(ens=>{
    return <ListItem 
              key ={ens?.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: theme.palette.secondary.main,
                background: theme.palette.primary.main,
                opacity: 0.7,
                ':nth-child(odd)':{
                  opacity: 0.8
                }
              }}
            >
              <Typography variant="body2"><i>{ens?.name}</i></Typography>
            </ListItem>
  });

  const boxStyles = { 
    maxWidth: '300px', 
    textAlign: 'center', 
    border: `1px solid ${theme.palette.info.main}`, 
    ':hover':{
      opacity: 0.85,
      cursor: 'pointer',
      border: `${theme.palette.secondary.main} 1px solid`
    }
  };

  const headerStyles = {
    background: theme.palette.info.main,
    opacity: 0.7,
    color: theme.palette.primary.main
  }

  return (
    <Box id={`concert-${id}`} sx={boxStyles} onClick={handleNavToShowPage}>
      <Typography variant="h5" sx={headerStyles} >{name}</Typography>
      <Typography variant="h6" sx={headerStyles} >{year}</Typography>
      <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>ft. Performances By</Typography>
      <List sx={{ padding: 0 }}>
        {performingEnsemblesToDisplay}
      </List>
    </Box>
  )
}

export default ConcertCard;