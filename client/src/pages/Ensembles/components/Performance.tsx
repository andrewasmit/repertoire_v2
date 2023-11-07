// External Dependencies
import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';
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


  return (
    <TableRow key={performance_id}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <NavLink to={`/pieces/${piece_id}`}>
          "{piece}"
        </NavLink>
      </TableCell>
      <TableCell>{year}</TableCell>
      <TableCell align="right">
        <NavLink to={`/concerts/${concertId}`}>
          <LaunchIcon color='primary'/>
        </NavLink>
      </TableCell>
    </TableRow>
  )
}

export default Performance;