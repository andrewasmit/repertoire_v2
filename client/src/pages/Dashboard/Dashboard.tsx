// External Depencies
import { useEffect, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { 
  hydrateConcertPrograms, 
  hydrateOrganization, 
  hydrateUsers, 
  hydrateEnsembles, 
  hydrateLibrary  
} from "../../redux/organizationSlice";
import { useFetchOrganizationConcerts } from "../../hooks/api/useFetchOrganizationConcerts";
import { useFetchOrganizationData } from "../../hooks/api/useFetchOrganizationData";
import Loading from "../../components/shared/Loading";

// Local Depencies
import logo from '/logo-color.svg'
import MyBarChart from "./charts/MyBarChart";
import MyPieChart from "./charts/MyPieChart";


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

      {fetchedOrganizationData &&
        <Box sx={{ backgroundColor: '#f4f4f4', opacity: 0.95, display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
          <MyPieChart theme={theme} orgData={fetchedOrganizationData} />
          <MyBarChart theme={theme} orgData={fetchedOrganizationData} />
        </Box>
      }
    </div>
  );
}

export default Dashboard;
