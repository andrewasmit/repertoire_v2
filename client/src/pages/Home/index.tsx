//External Dependencies

//Internal Dependencies

//Local Dependencies
import MainContainer from "../../components/MainContainer"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import './home.css'

function Home() {

  return (
    <div>
      <NavBar />
      <SideBar />
      <MainContainer />
    </div>
  )
}

export default Home