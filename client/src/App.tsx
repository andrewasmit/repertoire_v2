// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import { useFetch } from './hooks/useFetch';
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
import Loading from './utils/Loading';
// import logo from '/logo-no-background.svg'

function App() {

  const user = useAppSelector(state=> state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch('https://api.artic.edu/api/v1/artworks/search?q=cats', 'cats')

  console.log("useQuery: DATA", data);
  console.log("useQuery: IS LOADING", isLoading);
  console.log("useQuery: ERROR", error);


  console.log("Currently signed in: ", user);

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

  
  // const handleSignOutBtnClick = useCallback(()=>{
  //   fetch("/api/signout", {
  //     method: "DELETE"
  //   })
  //   .then(data=>console.log("DATA: ", data))
  //   .catch(err=>console.log("ERROR: ", err));

  //   dispatch(signOut());
  // }, [])

  // const handleFetchClick = () => {
  //   fetch("/api/signin", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: 'andrewasmit',
  //       password: 123456,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => dispatch(signIn(data)))
  //     .catch((err) => console.log("ERROR: ", err));
  // };
  if (isLoading){
    return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='signin' element={<SignIn /> } />
      </Routes>

      {/* <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo" alt="Main logo" />
        </a>
        <h1>Repertoire</h1>
        <button onClick={handleFetchClick}>Sign In</button>
        <button onClick={handleSignOutBtnClick}>Sign Out</button>
        <button onClick={fetchMeIfYouCan}>Fetch Me</button> */}
    </>
  )
}

export default App
