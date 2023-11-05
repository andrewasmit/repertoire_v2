// External Depencies
import { useCallback, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Tab, Tabs, Typography } from "@mui/material";

// Local Dependencies
import MyAccountBtn from "./MyAccountBtn";
import './navigation.css'
import logo from '/logo-no-background.svg'


function NavBar() {

  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleNavigate(newValue);
  };

  const handleNavigate = useCallback((value: number): void=>{
    switch (value){
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/ensembles');
        break;
      case 2:
        navigate('/concerts');
        break;
      case 3:
        navigate('/library');
        break;
      case 4:
        navigate('/browse');
        break;
    }
  },[]);

  const handleNavToDash = useCallback((): void=>{
    navigate('/home');
  }, []);

  const handleNavToEnsembles = useCallback((): void=>{
    navigate('/ensembles');
  }, []);

  const handleNavToConcerts = useCallback((): void=>{
    navigate('/concerts');
  }, []);

  const handleNavToLibrary = useCallback((): void=>{
    navigate('/library');
  }, []);

  const handleNavToBrowse = useCallback((): void=>{
    navigate('/browse');
  }, []);
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="navbar">
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      {/* <ul>
        <li>
          <button onClick={handleNavToDash} >Dashboard</button>
        </li>
        <li>
          <button onClick={handleNavToEnsembles} >Ensembles</button>
        </li>
        <li>
          <button onClick={handleNavToConcerts} >Concerts</button>
        </li>
        <li>
          <button onClick={handleNavToLibrary} >Library</button>
        </li>
        <li>
          <button onClick={handleNavToBrowse} >Find New Music</button>
        </li>
      </ul> */}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          textColor="inherit"
          color='secondary'
          indicatorColor="secondary"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Ensembles" {...a11yProps(1)} />
          <Tab label="Concerts" {...a11yProps(2)} />
          <Tab label="Library" {...a11yProps(3)} />
          <Tab label="Find New Music" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <MyAccountBtn />
    </div>
  )
}

export default NavBar;