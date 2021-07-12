import React, {useContext, useState, useMemo, useEffect} from 'react'
import {MyContext} from '../contexts/MyContext'
import  { Redirect } from 'react-router-dom'
// Importing the Login & Register Componet
import Login from './Login'
import Register from './Register'
import Copyright from './Copyright';
import SearchAppBarHome from './SearchAppBarHome';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function Home(){
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

      const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#bf2126'
            }
          },
    });

    const {rootState,logoutUser, getParts, partSearch, getVendor, getVendorNumber,getPartNumber, getContainerNumber} = useContext(MyContext);
// console.log(getParts);
    const [redirect, setRedirect] = useState(false);
    
    // ,getVendor, getVendorNumber, getPartNumber, getContainerNumber
//  const result = useMemo (() => (getVendor()))

//     const submitForm = async () => {
//   Promise.all([getVendor(), getVendorNumber(), getPartNumber(), getContainerNumber()]).then((values) => {
    
//   })
//   return "Done";   
//     }


    // const makeRequest = getVendor()
    // console.log(makeRequest)
    // const makeRequest = async () => {
    //     await getVendor()
    //     await getVendorNumber()
    //     await getPartNumber()
        
    // }

    // makeRequest()

    // submitForm();

// getVendor();
// getVendorNumber();
// getPartNumber();
// getContainerNumber();



    const {isAuth,theUser,showLogin,vendorName, vendorNumber, partNumber, containerNumber} = rootState;
    //   console.log(vendorName);
// console.log(theUser);
      
    const initialState = {
        partInfo:{
            vendor_name:"",
            vendor_number:"",
            part_number:"",
            container_number:"",
        },
        errorMsg:'',
        successMsg:'',
        partRedirect:false,
        value: true,

    }
    const [state,setState, data, setData] = useState(initialState);

    useEffect(() => {
      getVendor();

    }, []);

    useEffect(() =>{
      getVendorNumber();
      
    }, []);

    useEffect(() =>{
      
      getPartNumber();
      
    }, []);

    useEffect(() =>{
      
      getContainerNumber();
    }, []);

    const handleChangeValue = (e) => {
      // state.partInfo.vendor_name = [];
      // state.partInfo.vendor_name = "";
      // state.partInfo.vendor_number = "";
      // console.log(state.partInfo);
      return <Redirect to={{ pathname: '/'}} />
     }

    //On Submit the parts search
    const submitForm = async (event) => {
        event.preventDefault();
        
        

            await getParts(theUser);
            setState({
                ...state,
                partRedirect:true
            });
            // partRedirect(true);

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // fetchData();
      // console.log(state.partInfo.vendor_name.vendor);
      // console.log(state.partInfo);
        await partSearch(state.partInfo);
        setRedirect(true);
        // setData(e);
    }

    const onChangeValue = (e, value) => {
      // console.log(value);
      // console.log(e.target.textContent);
      var id = e.target.getAttribute('id');
      var name = id.split("-")[0];
      var value = e.target.textContent;
      // console.log(value);
        setState({
            ...state,
            partInfo:{
                ...state.partInfo,
                [name]:value
            }
        });

        
    }

    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }


    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault()

    // const handleValidation() {
    //   let fields = state.partInfo;
    //   let errors = {};
    //   let formIsValid = true;

    //   if ($fields["vendor_name"] != "" && $fields["vender_number"] != "" && $fields["part_number"] != "" && $fields["container_number"]!= "") {
    //     $formIsValid = false;
    //     $errors
    //   }
    // }
    // If user Logged in
    if(isAuth)
    {
      // console.log(state);
        if (redirect)
        
            return <Redirect to={{ pathname: '/part', state:{part: state}}} />
        if (state.partRedirect)
            return <Redirect to={{ pathname: '/parts'}}/>
        const test = {
            options: vendorName,
            getOptionLabel: (option) => option.vendor,
        };

        
        
        return(
          // <SearchAppBar/>

            
            <>
                      <SearchAppBarHome handleChangeValue={handleChangeValue}/>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
              <Avatar className={classes.avatar} src="./logo-bullet.png">
                {/* <LockOutlinedIcon /> */}
              L
              </Avatar>
              <Typography component="h1" variant="h5">
                <Link onClick={submitForm} color="inherit">
                LOGIKube
                </Link>
                
              </Typography>
              {/* onSubmit={submitForm} */}
              <form className={classes.form}  onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                      <Autocomplete
                      {...test}
                        id="vendor_name"
                        name="vendor_name"
                        options={vendorName}
                        getOptionLabel={(option)=>option.vendor}
                        getOptionSelected={(option, value) => option.vendor === value.vendor}
                      //   onChange={(event,value) =>        setState({
                      //     ...state,
                      //     partInfo:{
                      //         ...state.partInfo,
                      //         vendor_name:value
                      //     }
                      // })}
                      onChange={onChangeValue}
                    renderInput={(params)=> <TextField
                    {...params}
                    //   autoComplete="fname"
                      name="vendor_name"
                      variant="outlined"
                      
                      fullWidth
                      id="vendor_name"
                      label="Vendor Name"
                      // value={state.partInfo.vendor_name} 
                      // onChange={onChangeValue}
                      autoFocus
                    />
                    }
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Autocomplete
                        id="vendor_number"
                        options={vendorNumber}
                        getOptionLabel={(option)=>option.vendor_number}
                      //   onChange={(event,value) =>        setState({
                      //     ...state,
                      //     partInfo:{
                      //         ...state.partInfo,
                      //         vendor_number:value
                      //     }
                      // })}
                    onChange={onChangeValue}
                    renderInput={(params)=> <TextField
                    {...params}
                    variant="outlined"
                    
                    fullWidth
                    id="vendor_number"
                    label="Vendor Number"
                    name="vendor_number"
                  //   value={state.partInfo.vendor_number} 


                  />
                    }
                    />

                  </Grid>
                  <Grid item xs={12}>
                  <Autocomplete
                        id="part_number"
                        options={partNumber}
                        getOptionLabel={(option)=>option.part_number}
                      //   onChange={(event,value) =>        setState({
                      //     ...state,
                      //     partInfo:{
                      //         ...state.partInfo,
                      //         part_number:value
                      //     }
                      // })}
                      onChange={onChangeValue}
                    renderInput={(params)=> <TextField
                    {...params}
                        variant="outlined"
                        
                        fullWidth
                        id="part_number"
                        label="Part Number"
                        name="part_number"
                      //   value={state.partInfo.part_number} 

                      />
                    }
                    />

                  </Grid>
//                   <Grid item xs={12}>

//                   <Autocomplete
//                         id="container_number"
//                         options={containerNumber}
//                         getOptionLabel={(option)=>option.container_number}
//                       //   onChange={(event,value) =>        setState({
//                       //     ...state,
//                       //     partInfo:{
//                       //         ...state.partInfo,
//                       //         container_number:value
//                       //     }
//                       // })}
//                       onChange={onChangeValue}
//                     renderInput={(params)=> <TextField
//                     {...params}
//                         variant="outlined"
                        
//                         fullWidth
//                         name="container_number"
//                         label="Container Number"
//                         type="container_number"
//                         id="container_number"
//                       //   value={state.partInfo.container_number} 

                        
//                       />
//                     }
//                     />


//                   </Grid>
                  <Grid item xs={12}>

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
                  Search
                </Button>
                </MuiThemeProvider>

              </form>
              {/* <button onClick={logoutUser}>Logout</button> */}
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
          </>
          
        )
    }
    // Showing Login Or Register Page According to the condition
    else if(showLogin){
        return <Login/>;
    }
    else{
        return <Register/>;
    }
    
}

export default Home;
