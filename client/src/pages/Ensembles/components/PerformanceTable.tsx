// External Dependencies
import { useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Box
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { NavLink } from'react-router-dom';


// Internal Dependencies
import { useAppSelector } from '../../../redux/hooks';
import { findEnsemblePerformances } from '../../../utils/findEnsemblePerformances';


interface Props{
  id: number;
}

export default function PerformanceTable({ id }: Props) {

  const { concertPrograms } = useAppSelector(state=> state.organization);

  const ensPerformances = useMemo(()=>{
    if (concertPrograms){
      return findEnsemblePerformances(id, concertPrograms);
    } else
    return null;
  }, [concertPrograms]);

  const performancesToDisplay = useMemo(()=>{
    if(ensPerformances){
      return ensPerformances.map((performance) => (
        <TableRow key={performance.performance.performance_id}>
          <TableCell>{performance.name}</TableCell>
          <TableCell>
            <NavLink to={`/pieces/${performance.performance.piece_id}`}>
              "{performance.performance.piece}"
            </NavLink>
          </TableCell>
          <TableCell>{performance.year}</TableCell>
          <TableCell align="right">
            <NavLink to={`/concerts/${performance.concertId}`}>
              <LaunchIcon color='primary'/>
            </NavLink>
          </TableCell>
        </TableRow>
      ))
    } else
    return null;
  }, [ensPerformances]);

  return (
    <Box sx={{ padding: 4 }}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell><strong>Concert Title</strong></TableCell>
            <TableCell><strong>Performance</strong></TableCell>
            <TableCell><strong>Year</strong></TableCell>
            <TableCell align="right"><strong>Concert Details</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {performancesToDisplay}
        </TableBody>
      </Table>
    </Box>
  );
}