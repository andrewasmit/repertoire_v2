// External Depencies
import { useEffect } from "react";

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hydrateConcertPrograms, hydrateOrganization, hydrateUsers, hydrateEnsembles, hydrateLibrary  } from "../redux/organizationSlice";
import { useFetchOrganizationConcerts } from "../hooks/api/useFetchOrganizationConcerts";
import { useFetchOrganizationData } from "../hooks/api/useFetchOrganizationData";

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'
import Loading from "../components/shared/Loading";


function Dashboard() {

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state=>state.user);

  const { 
    data: fetchedConcertProgramData, 
    isLoading: fetchedConcertProgramsLoading, 
  } = useFetchOrganizationConcerts(`api/organizations/${currentUser?.organizationId}/concerts`, 'organizationConcertPrograms');

  const { 
    data: fetchedOrganizationData, 
    isLoading: fetchedOrganizationLoading, 
  } = useFetchOrganizationData(`api/organizations/${currentUser?.organizationId}`, 'organizationData');


  useEffect(()=>{
    if(fetchedConcertProgramData !== undefined && fetchedOrganizationData !== undefined){
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
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>

      <h1>Repertoire</h1>
      <h2>This is the Dashboard</h2>
      <h3>This is where all of your organization information will be</h3>

    </div>
  );
}

export default Dashboard;
