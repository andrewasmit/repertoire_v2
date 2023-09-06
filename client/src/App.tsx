import { useEffect } from 'react'
import logo from '/logo-no-background.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { signIn, signOut } from './redux/userSlice';

function App() {

  const user = useAppSelector(state=> state.user)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    fetchMeIfYouCan();
  }, [])

  const fetchMeIfYouCan = () =>{
    fetch("/api/me")
    .then(res=>{
     if (res.ok){
      res.json()
      .then(data => console.log("RES: ", data))
     }
     else {
      console.log(" Probably unauthorized/Not logged in.");
     }
    }).catch(err=>console.log(err))
  }

  const handleBtnClick = ()=>{
    dispatch(signIn({
      username: 'Your Mom',
      emailAddress: 'your@mom.com',
      isAdmin: true,
      organizationId: 19
    }))
  }

  const handleSignOutBtnClick = ()=>{
    console.log("CURRENT USER: ", user);
    dispatch(signOut());
  }

  const handleFetchClick = ()=>{
    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        username: "andrewasmit",
        password: 123456
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>console.log("DATA: ", data))
    .catch(err=>console.log("ERROR: ", err));
  }

  return (
    <>
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo" alt="Main logo" />
        </a>
        <h1>Repertoire</h1>
        <button onClick={handleBtnClick}>Sign In</button>
        <button onClick={handleSignOutBtnClick}>Sign Out</button>
        <button onClick={handleFetchClick}>Log In</button>
        <button onClick={fetchMeIfYouCan}>Fetch Me</button>
      </div>
    </>
  )
}

export default App
