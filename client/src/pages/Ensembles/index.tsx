// External Depencies
import { useCallback, 
  // useEffect 
} from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../../hooks/userSignOut";
import { useAppDispatch,
  //  useAppSelector 
  } from "../../redux/hooks";
import { signOut } from "../../redux/userSlice";
// import { hydrateConcertPrograms, hydrateOrganization, hydrateUsers, hydrateEnsembles, hydrateLibrary  } from "../redux/organizationSlice";
// import { useFetchOrganizationConcerts } from "../../hooks/api/useFetchOrganizationConcerts";
// import { useFetchOrganizationData } from "../../hooks/api/useFetchOrganizationData";

// Local Depencies
// import "../App.css";
// import logo from '/logo-no-background.svg'
// import Loading from "../../components/shared/Loading";


function Ensembles() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { currentUser } = useAppSelector(state=>state.user);
  // const { concertPrograms } = useAppSelector(state=>state.organization);

  // const { 
  //   data: fetchedConcertProgramData, 
  //   isLoading: fetchedConcertProgramsLoading, 
  // } = useFetchOrganizationConcerts(`api/organizations/${currentUser?.organizationId}/concerts`, 'organizationConcertPrograms');

  // const { 
  //   data: fetchedOrganizationData, 
  //   isLoading: fetchedOrganizationLoading, 
  // } = useFetchOrganizationData(`api/organizations/${currentUser?.organizationId}`, 'organizationData');


  // useEffect(()=>{
  //   if(fetchedConcertProgramData !== undefined && fetchedOrganizationData !== undefined){
  //     const orgData= {
  //       id: fetchedOrganizationData.id,
  //       name: fetchedOrganizationData.name,
  //       uuid: fetchedOrganizationData.uuid
  //     }
  //     dispatch(hydrateConcertPrograms(fetchedConcertProgramData));
  //     dispatch(hydrateOrganization(orgData));
  //     dispatch(hydrateEnsembles(fetchedOrganizationData.ensembles));
  //     dispatch(hydrateUsers(fetchedOrganizationData.users));
  //     dispatch(hydrateLibrary(fetchedOrganizationData.pieces));
  //   }
  // },[fetchedConcertProgramData, fetchedOrganizationData]);

  const handleSignOutClick = useCallback(()=>{
    userSignOut();
    dispatch(signOut());
    navigate('/signin');
  }, [])


  return (
    <div>
      <h1>Repertoire</h1>
      <h2>This is the ENSEMBLES PAGE</h2>
      <h3>This is where all of your organization ensembles will be</h3>

      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
}

export default Ensembles;
