//External Dependencies

//Internal Dependencies

//Local Dependencies
import MainContainer from "../../components/MainContainer"
import NavBar from "../../components/shared/NavBar"
import './home.css'

function Home() {

  return (
    <div>
      {/* <h3 className="navbar" >NAVBAR</h3> */}
      <NavBar />
      <h2 className="side-navbar" >SIDE NAV</h2>
      <MainContainer />
    </div>
  )
}

export default Home