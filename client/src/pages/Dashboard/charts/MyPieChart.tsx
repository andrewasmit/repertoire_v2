// External Dependencies
import { useMemo } from 'react'
import { Box, Theme, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'

// Internal Dependencies
import { OrganizationResponse } from '../../../redux/organizationSlice'
import { getPieChartDataFromLibrary } from '../../../utils/getPieChartDataFromLibrary'

interface Props{
  orgData: OrganizationResponse;
  theme: Theme;
}

function MyPieChart({ orgData, theme }: Props) {

  const data = useMemo(()=>{
    return getPieChartDataFromLibrary(orgData);
  },[orgData]);

  const palette = useMemo(()=>{
    return [
      theme.palette.info.main,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ]
  }, [theme]);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', opacity: 0.95, display: 'inline-block' }}>
      <Typography variant='body1'> Pieces by Difficulty Level</Typography>
      <PieChart
        series={[
          {
            data: data,
          },
        ]}
        width={400}
        height={200}
        
        colors={palette}
      />
    </Box>
  )
}

export default MyPieChart