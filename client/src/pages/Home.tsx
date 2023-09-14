// External Depencies
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../hooks/userSignOut";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/userSlice";
import { hydrateConcertPrograms } from "../redux/organizationSlice";
import { useFetchOrganizationConcerts } from "../hooks/api/useFetchOrganizationConcerts";

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'
import Loading from "../components/shared/Loading";


function Home() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state=>state.user);
  const { concertPrograms } = useAppSelector(state=>state.organization);

  console.log("CONCERT PROGRAMS (in Home.ts): ", concertPrograms);
  console.log("CURRENT USER(in Home): ", currentUser);

  const { 
    data: fetchedConcertProgramData, 
    isLoading: fetchedConcertProgramsLoading, 
  } = useFetchOrganizationConcerts(`api/organizations/${currentUser?.organizationId}/concerts`, 'organizationConcertPrograms');

  useEffect(()=>{
    if(fetchedConcertProgramData !== undefined){
      console.log("RES FROM Concert Program API CALL (in Welcome.ts): ", fetchedConcertProgramData);
      dispatch(hydrateConcertPrograms(fetchedConcertProgramData));
    }
  },[fetchedConcertProgramData]);

  const handleSignOutClick = useCallback(()=>{
    userSignOut();
    dispatch(signOut());
    navigate('/signin');
  }, [])

  const isLoading = fetchedConcertProgramsLoading;

  if (isLoading){
    return <Loading />
  }

  return (
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <h1>Repertoire</h1>
      <h2>This is the Home Page</h2>
      <h3>This is where the dashboard will be with all of your information</h3>

      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
}

export default Home;
