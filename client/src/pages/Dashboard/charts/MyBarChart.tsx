// External Dependencies
import { BarChart } from '@mui/x-charts'
import { useMemo } from 'react';
import { Box, Theme } from '@mui/material';

// Internal Dependencies
import { getYAxisData } from '../../../utils/getYAxisData';
import { OrganizationResponse } from '../../../redux/organizationSlice';


interface Props{
  theme: Theme;
  orgData: OrganizationResponse;
};

function MyBarChart({ theme, orgData }: Props) {

  const palette = useMemo(()=>{
    return [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
    ]
  }, [theme]);

  const yAxisData: number[] | undefined = useMemo(()=>{
    if(orgData){
      return getYAxisData(orgData);
    };
  }, [orgData])


  return (
    <Box sx={{ display: 'inline-block', backgroundColor: '#f4f4f4', opacity: 0.95 }}>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12+'],
            scaleType: 'band',
            label: '# of Players',
            labelFontSize: 24,
            tickFontSize: 18
          }
        ]}
        yAxis={[
          {
            id:'barData',
            label: 'Pieces of Music',
            tickMinStep: 1,
            // TODO: Fix size of label and ticks
            // tickSize: 10,
            // tickLabelStyle:{
            //   fontSize: 50,
            //   color: 'red'
            // }
          },
        ]}
        series={[
          {
            data: yAxisData,
            label: 'Pieces of Music in Library'
          },
        ]}
        width={800}
        height={500}
        colors={palette}
        sx={{ paddingBottom: 10 }}
      />
    </Box>
  )
}

export default MyBarChart