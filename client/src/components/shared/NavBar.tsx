// External Depencies
import { useCallback, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Tab, Tabs, Typography } from "@mui/material";

// Internal Dependencies
import { useIsOpen } from "../../hooks/useIsOpen";

// Local Dependencies
import MyAccountBtn from "./MyAccountBtn";
import './navigation.css'
import logo from '/logo-no-background.svg'
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";
import { useAppDispatch } from "../../redux/hooks";
import { userSignOut } from "../../hooks/userSignOut";
import { signOut } from "../../redux/userSlice";


function NavBar() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const { isOpen, handleClose, handleOpen } = useIsOpen();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleNavigate(newValue);
  };

  const handleSignOut = useCallback(():void=>{
    userSignOut();
    dispatch(signOut());
    handleClose();
    navigate('/signin');
  }, [])

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
          {/* <Tab label="Find New Music" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>

      <MyAccountBtn handleOpen={handleOpen} />
      
      <ConfirmationDialog 
        isOpen={isOpen}
        handleClose={handleClose}
        onConfirm={handleSignOut}
        headerText="Are you sure you want to logout?"
        bodyText=""
      />
    </div>
  )
}

export default NavBar;