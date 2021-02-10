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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import SearchAppBarUser from './SearchAppBarUser';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// function Copyright() {
//     return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         <Link color="inherit" href="https://material-ui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }

function Register(){

  const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bf2126'
        }
      },
});


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
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    
    const { registerUser } = useContext(MyContext);
    console.log(registerUser);
    const initialState = {
        userInfo:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            company:'',
            location:'',

        },
        errorMsg:'',
        successMsg:'',
        
    }
    const [state,setState] = useState(initialState);

        // On Submit the Registration Form
        const submitForm = async (event) => {
            event.preventDefault();
            const data = await registerUser(state.userInfo);
            if(data.success){
                setState({
                    ...initialState,
                    successMsg:data.message,
                });
            }
            else{
                setState({
                    ...state,
                    successMsg:'',
                    errorMsg:data.message
                });
            }
        }

        // On change the Input Value (name, email, password)
        const onChangeValue = (e) => {
            setState({
                ...state,
                userInfo:{
                    ...state.userInfo,
                    [e.target.name]:e.target.value
                }
            });
        }





      
    
    // Show Message on Success or Error
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    // return(
    //     <div className="_loginRegister">
    //         <h1>Sign Up</h1>
    //         <form onSubmit={submitForm} noValidate>
    //             <div className="form-control">
    //                 <label>First Name</label>
    //                 <input name="first_name" required type="text" value={state.userInfo.first_name} onChange={onChangeValue} placeholder="Enter your first name"/>
    //             </div>
    //             <div className="form-control">
    //                 <label>last Name</label>
    //                 <input name="last_name" required type="text" value={state.userInfo.last_name} onChange={onChangeValue} placeholder="Enter your last name"/>
    //             </div>
    //             <div className="form-control">
    //                 <label>Email</label>
    //                 <input name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email"/>
    //             </div>
    //             <div className="form-control">
    //                 <label>Password</label>
    //                 <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password"/>
    //             </div>
    //             {errorMsg}
    //             {successMsg}
    //             <div className="form-control">
    //                 <button type="submit">Sign Up</button>
    //             </div>
    //         </form>
    //         <div className="_navBtn">
    //             <button  onClick={toggleNav}>Login</button>
    //         </div>
    //     </div>
    // );

    const classes = useStyles();

  return (
    <>
    <SearchAppBarUser />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>
        <form className={classes.form} onSubmit={submitForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                value={state.userInfo.first_name} 
                onChange={onChangeValue}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                value={state.userInfo.last_name} 
                onChange={onChangeValue}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={state.userInfo.email} 
                onChange={onChangeValue}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="company"
                name="company"
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                value={state.userInfo.company} 
                onChange={onChangeValue}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="location"
                name="location"
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                value={state.userInfo.location} 
                onChange={onChangeValue}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
            {errorMsg}
            {successMsg}
          </Grid>
          <MuiThemeProvider theme={theme}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
          </MuiThemeProvider>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}

export default Register;