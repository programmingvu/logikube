import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddPart from './AddPart';
import UserList from './UserList';
import Link from '@material-ui/core/Link';
import { Icon } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import  { Redirect } from 'react-router-dom'

import {MyContext} from '../contexts/MyContext'


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,

  },
  background: {
      backgroundcolor: '#bf2126',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    
  },
  resize: {
    maxHeight: 38,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bf2126'
        }
      },
});

export default function SearchAppBarHome({handleChangeValue}) {
    const {logoutUser} = useContext(MyContext);
  const classes = useStyles();
//   const [selectedItem, setSelectedItem] = React.useState("");

  
//   function handleChange(event) {
//     // console.log(event);
//     setSelectedItem(event.target.value);
//     let _vals = event.target.value
//       ? parts.filter(r => r.active === event.target.value)
//       : parts;
//       // console.log(_vals);
//     setTableData(_vals);
//   }

function reset(event) {
  console.log('test');
  window.location.reload(false);
}

const [anchorEl, setAnchorEl] = React.useState(null);
const [openDialogName, setOpenDialog] = React.useState(null);

const handleClick = (event) => {
    // console.log(event.currentTarget);
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    // console.log('test');
  setAnchorEl(null);
  console.log(anchorEl);

};

const addPart = () => {
    setOpenDialog('ADD');
    handleClose();
    // console.log('test');
    // <>
    // <AddPart />
    // </>
}
const closeDialog = () => {
    setOpenDialog(null);
  };

 
  return (
    <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Button
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
            </Button>
            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={addPart}>Add New Part</MenuItem>
        {/* <MenuItem 
                onClick={handleClose}
                component={Link} href="/register" color="inherit">
                    Create New User</MenuItem> */}
        <MenuItem 
        onClick={handleClose}
        component={Link} href="/parts" color="inherit"
        >
            Parts List
            </MenuItem>

        {/* <MenuItem 
        onClick={handleClose}
        component={Link} href="/users" color="inherit"
        >
            User List
            </MenuItem> */}

            <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
      <AddPart open={openDialogName === "ADD"} onClose={closeDialog} />
          
          
          {/* <Typography className={classes.title} variant="h6" noWrap> */}
            <Link href="/">
            <img src="http://logikube.logikor.com/logikparts/src/static/media/logikorlogo-white.svg"  className={classes.resize}/>
            </Link>
            <Typography className={classes.title}></Typography>
          {/* </Typography> */}
          {/* <div className={classes.search}> */}
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
                          {/* <label value="Toggle Active: ">Toggle Active: </label> */}
<Button variant="contained" onClick={reset}>Reset</Button>
          {/* </div> */}
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
    </div>
  );
}