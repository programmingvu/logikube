import React, {useContext, useState} from 'react'
import {MyContext} from '../contexts/MyContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Copyright from './Copyright';
// import { Link } from 'react-router-dom';

function Login(){

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bf2126'
        }
      },
});


    const {toggleNav,loginUser,isLoggedIn} = useContext(MyContext);


    
    // getVendor, getVendorNumber, getPartNumber, getContainerNumber


    const initialState = {
        userInfo:{
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
        redirect:false,
    }
    
    const [state,setState] = useState(initialState);

    // On change input value (email & password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }

    // On Submit Login From
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token){
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            // await isLoggedIn();
            await Promise.all([isLoggedIn()])
            // , getVendor(), getVendorNumber(), getPartNumber(), getContainerNumber()
            
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // Show Message on Error or Success
    let successMsg = '';
    let errorMsg = '';
    let redirect = false;
    // console.log(redirect);
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }



//     return(
//         <div className="_loginRegister">
//             <h1>Login</h1>
//             <form  onSubmit={submitForm} noValidate>
//                 <div className="form-control">
//                     <label>Email</label>
//                     <input name="email" type="email" required placeholder="Enter your email" value={state.userInfo.email} onChange={onChangeValue} />
//                 </div>
//                 <div className="form-control">
//                     <label>Password</label>
//                     <input name="password" type="password" required placeholder="Enter your password" value={state.userInfo.password} onChange={onChangeValue} />
//                 </div>
//                 {errorMsg}
//                 {successMsg}
//                 <div className="form-control">
//                     <button type="submit">Login</button>
//                 </div>
//             </form>
//             <div className="_navBtn">
//                 <button onClick={toggleNav}>Register</button>
//             </div>
//         </div>
//     );

const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        {/* <Avatar alt="logikor" src="192.168.1.43/logikinventory/src/components/logo.jpg"/> */}
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={state.userInfo.email}
            onChange={onChangeValue}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={state.userInfo.password} 
            onChange={onChangeValue}
            autoComplete="current-password"
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
                  {errorMsg}
        {successMsg}
        <MuiThemeProvider theme={theme}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          </MuiThemeProvider>

          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              {/* <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;


