// External Dependencies
import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import { useAppDispatch } from '../../redux/hooks';
import { userSignOut } from '../../hooks/userSignOut';
import { signOut } from '../../redux/userSlice';
import { Divider } from '@mui/material';


export default function MyAccountBtn() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOutClick = useCallback(():void=>{
    userSignOut();
    dispatch(signOut());
    handleClose();
    navigate('/signin');
  }, [])

  const styles = {
    marginTop: 2,  
    ':hover':{ 
      color: '#143B38', 
      backgroundColor: '#E4CEC5', 
      boxShadow: 5
    },
    padding: 1,
    margin: 1,
    fontSize: 20
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={styles}
        color= 'secondary'
      >
        My Account
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>My Organization</MenuItem>
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}