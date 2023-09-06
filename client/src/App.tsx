// import { useState } from 'react'
import logo from '/logo-no-background.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { signIn, signOut } from './redux/userSlice';

function App() {

  const user = useAppSelector(state=> state.user)
  const dispatch = useAppDispatch();

  const handleBtnClick = ()=>{
    // 
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

  return (
    <>
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo" alt="Main logo" />
        </a>
        <h1>Repertoire</h1>
        <button onClick={handleBtnClick}>Sign In</button>
        <button onClick={handleSignOutBtnClick}>Sign Out</button>
      </div>
    </>
  )
}

export default App
