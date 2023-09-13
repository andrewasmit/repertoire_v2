// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import { useFetch } from './hooks/api/useFetch';
import { signIn} from './redux/userSlice';

// Local Dependencies
import './App.css'
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Loading from './components/shared/Loading';
import { hydrateEnsembles, hydrateSolos } from './redux/fetchedLibrarySlice';

function App() {

  // const user = useAppSelector(state=> state.user)
  // const library = useAppSelector(state=> state.fetchedLibrary);
  const state = useAppSelector(state=> state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log("LIBRARY: ", library);
  console.log("STATE: ", state);

  const { 
    data: fetchedEnsemblesData, 
    isLoading: fetchedEnsemblesLoading, 
  } = useFetch(`${import.meta.env.VITE_PERC_LIBRARY_BASE}?ensembles`, 'fetchedPercussionEnsmebles');

  const { 
    data: fetchedSolosData, 
    isLoading: fetchedSolosLoading, 
  } = useFetch(`${import.meta.env.VITE_PERC_LIBRARY_BASE}solos?`, 'fetchedPercussionSolos');

  // console.log("useQuery: ENSEMBLE DATA", fetchedEnsemblesData);
  // console.log("useQuery: SOLO DATA", fetchedSolosData);

  useEffect(()=>{
    if (fetchedEnsemblesData !== undefined && fetchedEnsemblesData !== undefined){
      dispatch(hydrateEnsembles(fetchedEnsemblesData));
      dispatch(hydrateSolos(fetchedSolosData));
    }
  }, [fetchedEnsemblesData, fetchedSolosData]);

  const isLoading = fetchedEnsemblesLoading || fetchedSolosLoading;
 
  useEffect(()=>{
    fetch("/api/me")
    .then((res) => {
      if (res.ok) {
        res.json().then((data) =>{
          dispatch(signIn(data));
          navigate('/home');
        });
      } else {
        navigate('/signin');
        console.log("No Session Detected. Navigating to Signin page.");
      }
    })
    .catch((err) => console.log(err));
  }, [])


  if (isLoading){
    return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<SignIn /> } />
        <Route path='/signup' element={<SignUp /> } />
      </Routes>
    </>
  )
}

export default App
