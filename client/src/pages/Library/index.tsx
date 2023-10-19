// External Dependencies
import Box from '@mui/material/Box';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

// Internal Dependencies
import { useAppSelector } from '../../redux/hooks';
import { useIsOpen } from '../../hooks/useIsOpen';

// Local Dependencies
import { useColumns } from './hooks';
import { Button, Collapse } from '@mui/material';
import AddNewPieceForm from './AddNewPieceForm';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


function Library() {

  const { library } = useAppSelector(state=>state.organization);
  
  const columns = useColumns();
  const navigate = useNavigate();

  const { 
    isOpen: isAddPieceOpen, 
    handleOpen: handleOpenAddPiece, 
    handleClose: handleCloseAddPiece, 
  } = useIsOpen();

  const handleClickRow = useCallback((params: GridRowParams)=>{
    navigate(`/library/${params.id}`)
  }, []);

  return (
    <div id='library-page'>
      <Box sx={{ height: 600, width: '100%' }}>

        <h1>This is the Library Page</h1>

        {!isAddPieceOpen &&
          <Button variant='contained' onClick={handleOpenAddPiece}>Add New Piece To Library</Button>
        }

        <Collapse in={isAddPieceOpen}>
          <AddNewPieceForm handleClose={handleCloseAddPiece} />
        </Collapse>

        { library ? 
          <DataGrid
            rows={library}
            columns={columns}
            onRowClick={handleClickRow}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{
              '& .MuiDataGrid-row:hover': {
                color: 'primary.main',
                cursor: 'pointer',
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          /> :
          <h2>There are currently no pieces in your library</h2>
        }
      </Box>
    </div>
  );
}

export default Library;