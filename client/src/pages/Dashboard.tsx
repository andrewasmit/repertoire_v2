// External Depencies
import { useEffect, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hydrateConcertPrograms, hydrateOrganization, hydrateUsers, hydrateEnsembles, hydrateLibrary  } from "../redux/organizationSlice";
import { useFetchOrganizationConcerts } from "../hooks/api/useFetchOrganizationConcerts";
import { useFetchOrganizationData } from "../hooks/api/useFetchOrganizationData";

// Local Depencies
import "../App.css";
import logo from '/logo-color.svg'
import Loading from "../components/shared/Loading";
import { BarChart } from "@mui/x-charts";


function Dashboard() {

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { currentUser } = useAppSelector(state=>state.user);
  const { organization, ensembles, concertPrograms, users, library } = useAppSelector(state=>state.organization);

  const { 
    data: fetchedConcertProgramData, 
    isLoading: fetchedConcertProgramsLoading, 
  } = useFetchOrganizationConcerts(`api/organizations/${currentUser?.organizationId}/concerts`, 'organizationConcertPrograms');

  const { 
    data: fetchedOrganizationData, 
    isLoading: fetchedOrganizationLoading, 
  } = useFetchOrganizationData(`api/organizations/${currentUser?.organizationId}`, 'organizationData');

  const isOrganizationNull = useMemo((): boolean=>{
    return (!organization || !ensembles || !concertPrograms || !users || !library) ? true : false
  }, [organization, ensembles, concertPrograms, users, library]);

  useEffect(()=>{
    if(fetchedConcertProgramData !== undefined && fetchedOrganizationData !== undefined && isOrganizationNull){
      const orgData= {
        id: fetchedOrganizationData.id,
        name: fetchedOrganizationData.name,
        uuid: fetchedOrganizationData.uuid
      }
      dispatch(hydrateConcertPrograms(fetchedConcertProgramData));
      dispatch(hydrateOrganization(orgData));
      dispatch(hydrateEnsembles(fetchedOrganizationData.ensembles));
      dispatch(hydrateUsers(fetchedOrganizationData.users));
      dispatch(hydrateLibrary(fetchedOrganizationData.pieces));
    }
  },[fetchedConcertProgramData, fetchedOrganizationData]);

  const isLoading = fetchedConcertProgramsLoading || fetchedOrganizationLoading;

  if (isLoading){
    return <Loading />
  }

  console.log(fetchedOrganizationData);

  return (
    <div>
      <Box sx={{ background: theme.palette.secondary.main }} >
        <Box
          component="img"
          className="logo"
          sx={{
            height: 'auto',
            width: 250,
            margin: 3,
            padding: 2,
            boxSizing: 'border-box',
          }}
          alt="Main Logo"
          src={logo}
        />
      </Box>

      <Typography variant="h1" sx={{ fontSize: 80 }}>
        {fetchedOrganizationData?.name}
      </Typography>

      <Typography variant="h3">This is the Dashboard</Typography>

      <Typography variant="body1">
        This is where all of your organization information will be
      </Typography>

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />

      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['bar A', 'bar B', 'bar C'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}

export default Dashboard;
