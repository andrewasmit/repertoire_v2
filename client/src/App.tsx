// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import { useFetch } from './hooks/api/useFetch';
// import { fetchData } from './hooks/useFetch';
// import { fetchMeIfYouCan } from './utils/hooks';
import { 
  signIn, 
  // signOut 
} from './redux/userSlice';

// Local Dependencies
import './App.css'
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Loading from './components/shared/Loading';
// import logo from '/logo-no-background.svg'

function App() {

  const user = useAppSelector(state=> state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { 
    data: fetchedEnsemblesData, 
    isLoading: fetchedEnsemblesLoading, 
    // error: fetchedEnsemblesErrors 
  } = useFetch(`${import.meta.env.VITE_PERC_LIBRARY_BASE}?/ensembles`, 'fetchedPercussionEnsmebles');

  const { 
    data: fetchedSolosData, 
    isLoading: fetchedSolosLoading, 
    // error: fetchedSolosErrors 
  } = useFetch(`${import.meta.env.VITE_PERC_LIBRARY_BASE}?/solos`, 'fetchedPercussionSolos');

  const isLoading = fetchedEnsemblesLoading || fetchedSolosLoading;


  console.log("useQuery: ENSEMBLE DATA", fetchedEnsemblesData);
  console.log("useQuery: SOLO DATA", fetchedSolosData);


  console.log("Currently signed in: ", user);

  console.log("BASE: ", import.meta.env.VITE_PERC_LIBRARY_BASE)

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
