// External Dependencies
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Routes, Route, useNavigate } from "react-router-dom";

// Internal Dependencies
import Home from './components/Home';

// Local Dependencies
import './App.css'
import { 
  signIn, 
  // signOut 
} from './redux/userSlice';
// import logo from '/logo-no-background.svg'

function App() {

  const user = useAppSelector(state=> state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        console.log(" Probably unauthorized/Not logged in.");
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
  

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
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
