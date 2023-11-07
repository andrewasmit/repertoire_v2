// External Dependencies
import { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Box,
  Typography,
  useTheme
} from '@mui/material';

// Internal Dependencies
import { useAppSelector } from '../../../redux/hooks';
import { findEnsemblePerformances } from '../../../utils/findEnsemblePerformances';
import { findEnsembleName } from '../../../utils/findEnsembleName';

// Local Dependencies
import Performance from './Performance';


interface Props{
  id: number;
}

export default function PerformanceTable({ id }: Props) {

  const theme = useTheme();
  const { concertPrograms, ensembles } = useAppSelector(state=> state.organization);

  const ensPerformances = useMemo(()=>{
    if (concertPrograms){
      return findEnsemblePerformances(id, concertPrograms);
    } else
    return null;
  }, [concertPrograms]);


  const ensName = useMemo(()=>{
    if(ensembles){
      return findEnsembleName(ensembles, id);
    }
  }, [ensembles]);


  const performancesToDisplay = useMemo(()=>{
    if(ensPerformances){
      return ensPerformances.map((performance) => (
        <Performance 
          concertId={performance.performance.performance_id}
          performance_id={performance.concertId}
          piece_id={performance.performance.piece_id}
          piece={performance.performance.piece}
          name={performance.name}
          year={performance.year}
        />
      ))
    } else
    return null;
  }, [ensPerformances]);

  const tableHeaderStyles = useMemo(()=>{
    return {
      color: theme.palette.info.main,
      fontSize: 'large',
      fontWeight: 'fontWeightBold'
    }
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {performancesToDisplay !== null && performancesToDisplay.length > 0 ? 
          <Typography variant="h4" sx={{ padding: 2 }}>Performances from {ensName}</Typography> : 
          <Typography variant="h5">{ensName} has not yet performed</Typography>
        }
      
      <Box sx={{ padding: 5, background: theme.palette.primary.main, opacity: 0.8, }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyles}>Concert Title</TableCell>
              <TableCell sx={tableHeaderStyles}>Performance</TableCell>
              <TableCell sx={tableHeaderStyles}>Year</TableCell>
              <TableCell sx={tableHeaderStyles} align="right">Concert Details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {performancesToDisplay}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}