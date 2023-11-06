// External Dependencies
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

interface Props{
  handleOpen: ()=> void;
}

export default function MyAccountBtn({ handleOpen }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        
        <MenuItem onClick={handleOpen}>Logout</MenuItem>
      </Menu>
    </div>
  );
}