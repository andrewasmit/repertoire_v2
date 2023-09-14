// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import { useFetchExternalLibrary } from './hooks/api/useFetchExternalLibrary';
import { signIn} from './redux/userSlice';

// Local Dependencies
import './App.css'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Loading from './components/shared/Loading';
import { hydrateEnsembles, hydrateSolos } from './redux/fetchedLibrarySlice';

function App() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { 
    data: fetchedEnsemblesData, 
    isLoading: fetchedEnsemblesLoading, 
  } = useFetchExternalLibrary(`${import.meta.env.VITE_PERC_LIBRARY_BASE}?ensembles`, 'fetchedPercussionEnsmebles');

  const { 
    data: fetchedSolosData, 
    isLoading: fetchedSolosLoading, 
  } = useFetchExternalLibrary(`${import.meta.env.VITE_PERC_LIBRARY_BASE}solos?`, 'fetchedPercussionSolos');


  useEffect(()=>{
    if (fetchedEnsemblesData !== undefined && fetchedSolosData !== undefined){
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
        navigate('/welcome');
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
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<SignIn /> } />
        <Route path='/signup' element={<SignUp /> } />
      </Routes>
    </>
  )
}

export default App
