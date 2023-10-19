// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import { useFetchExternalLibrary } from './hooks/api/useFetchExternalLibrary';
import { hydrateEnsembles, hydrateSolos } from './redux/fetchedLibrarySlice';
import { signIn} from './redux/userSlice';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Loading from './components/shared/Loading';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Ensembles from './pages/Ensembles';
import EnsembleShow from './pages/Ensembles/Show';
import NewEnsembleForm from './pages/Ensembles/Add/NewEnsembleForm';
import Concerts from './pages/Concerts';
import NewConcertForm from './pages/Concerts/Add/NewConcertForm';
import ConcertShow from './pages/Concerts/Show';
import Library from './pages/Library';
import LibraryShow from './pages/Library/Show/LibraryShow';

// Local Dependencies
import './App.css'


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
        <Route path='/signin' element={<SignIn /> } />
        <Route path='/signup' element={<SignUp /> } />
        <Route path='/' element={<Home />} >
          <Route path='home' element={<Dashboard />} />
          <Route path='ensembles' element={<Ensembles />} />
          <Route path='ensembles/:id' element={<EnsembleShow />} />
          <Route path='ensembles/new' element={<NewEnsembleForm />} />
          <Route path='concerts' element={<Concerts />} />
          <Route path='concerts/new' element={<NewConcertForm />} />
          <Route path='concerts/:id' element={<ConcertShow />} />
          <Route path='library' element={<Library />} />
          <Route path='library/:id' element={<LibraryShow />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
