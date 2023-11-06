// External Depencies
import { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hydrateConcertPrograms, hydrateOrganization, hydrateUsers, hydrateEnsembles, hydrateLibrary  } from "../redux/organizationSlice";
import { useFetchOrganizationConcerts } from "../hooks/api/useFetchOrganizationConcerts";
import { useFetchOrganizationData } from "../hooks/api/useFetchOrganizationData";

// Local Depencies
import "../App.css";
import logo from '/logo-color.svg'
import Loading from "../components/shared/Loading";


function Dashboard() {

  const dispatch = useAppDispatch();
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
      <Box
        component="img"
        className="logo"
        sx={{
          height: 'auto',
          width: 250,
          marginTop: 8,
          padding: 2,
          boxSizing: 'border-box'
        }}
        alt="Main Logo"
        src={logo}
      />

      <Typography variant="h1">Repertoire</Typography>

      <Typography variant="h3">This is the Dashboard</Typography>

      <Typography variant="body1">
        This is where all of your organization information will be
      </Typography>
    </div>
  );
}

export default Dashboard;
