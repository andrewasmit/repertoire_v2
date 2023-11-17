// External Dependencies
import { BarChart } from '@mui/x-charts'
import { OrganizationResponse } from '../../../redux/organizationSlice';
import { useMemo } from 'react';
import { Theme } from '@mui/material';
import { getYAxisData } from '../../../utils/getYAxisData';

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
    <div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12+'],
            scaleType: 'band',
            label: '# of Players',
          }
        ]}
        yAxis={[
          {
            label: 'Pieces of Music'
          },
        ]}
        series={[
          {
            data: yAxisData,
          },
        ]}
        width={800}
        height={450}
        colors={palette}
        sx={{ paddingBottom: 10 }}
      />
    </div>
  )
}

export default MyBarChart