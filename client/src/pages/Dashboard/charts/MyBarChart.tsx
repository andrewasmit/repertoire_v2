// External Dependencies
import { BarChart } from '@mui/x-charts'
import { OrganizationResponse } from '../../../redux/organizationSlice';

interface Props{
  palette: any;
  orgData: OrganizationResponse;
};

function MyBarChart({ palette, orgData }: Props) {

  // const chartSetting = {
  //   yAxis: [
  //     {
  //       label: 'rainfall (mm)',
  //     },
  //   ],
  //   width: 500,
  //   height: 300,
  //   sx: {
  //     [`.${axisClasses.left} .${axisClasses.label}`]: {
  //       transform: 'translate(-20px, 0)',
  //     },
  //   },
  // };

  return (
    <div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12+'],
            scaleType: 'band',
            label: '# of Players'
          },
        ]}
        yAxis={[
          {
            label: 'Pieces of Music'
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
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