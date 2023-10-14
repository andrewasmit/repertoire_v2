// External Dependencies
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// Internal Dependencies
import { useAppSelector } from '../../redux/hooks';

// Local Dependencies
import { useColumns } from './hooks';


function Library() {

  const { library } = useAppSelector(state=>state.organization);
  
  const columns = useColumns();

  return (
    <div id='library-page'>
      <Box sx={{ height: 600, width: '100%' }}>

        <h1>This is the Library Page</h1>

        { library ? 
          <DataGrid
            rows={library}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
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