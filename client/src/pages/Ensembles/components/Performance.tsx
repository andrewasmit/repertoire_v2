// External Dependencies
import { FC, useMemo } from 'react'
import { NavLink } from 'react-router-dom';
import { TableCell, TableRow, useTheme } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';


interface PerformanceProps{
  concertId: number,
  performance_id: number,
  piece_id: number,
  name: string,
  piece: string,
  year: string | number,
}

const Performance: FC<PerformanceProps> = ({
  concertId, 
  performance_id, 
  piece_id, 
  piece, 
  year, 
  name, 
})=>{

  const theme = useTheme();

  const rowStyles={
    color: theme.palette.primary.main,
    background: '#fff',
    ':hover':{
      background: theme.palette.secondary.main,
      opacity: 0.9
    }
  }

  const cellStyles = useMemo(()=>{
    return {
      color: theme.palette.primary.main,
      fontSize: 'medium',
      textDecoration: 'none',
      padding: 3,
    }
  }, []);

  return (
    <TableRow key={performance_id}  sx={rowStyles}>
      <TableCell sx={cellStyles}>{name}</TableCell>
      <TableCell sx={cellStyles}>
        <NavLink to={`/pieces/${piece_id}`} >
          "{piece}"
        </NavLink>
      </TableCell>
      <TableCell sx={cellStyles}>{year}</TableCell>
      <TableCell align="right" sx={cellStyles}>
        <NavLink to={`/concerts/${concertId}`}>
          <LaunchIcon color='primary'/>
        </NavLink>
      </TableCell>
    </TableRow>
  )
}

export default Performance;