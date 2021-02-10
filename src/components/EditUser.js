import React, { useContext, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    
} from "@material-ui/core";
import { MyContext } from '../contexts/MyContext'
import EditIcon from "@material-ui/icons/Edit";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        //   margin: theme.spacing(1),
        minWidth: 200,
        display: 'flex',
    },
    selectEmpty: {
        //   marginTop: theme.spacing(2),
    },
}));

export default function EditUser({ data }) {
    // const PartInfo = props => {
    //   const [open] = React.useState(false);
    const classes = useStyles();
    const { updateUser, rootState } = useContext(MyContext);
// console.log(data);
    const initialState = {
        userInfo: {
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            active: data.active,
            admin: data.admin,
            
        },
        errorMsg:'',
        successMsg:''
    }

    console.log(initialState);
    
    const {theUser} = rootState;
    const [state, setState] = useState(initialState);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    // const [reusable, setReusable] = React.useState('');
    // const [container, setContainer] = React.useState('');
    // const [stackable, setStackable] = React.useState('');
    // const part = {data};
    
    // console.log(stackable);
    // const [open,setOpen, part] = props.functions;
    //   const handleClickOpen = () => {
    //     setOpen(true);

    //   };
    // const partData = async() => {
    //     const data = await getPart(part);
    // }

    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    const handleClickOpen = e => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const saveData = async (event) => {
    //     setOpen(false);
    // };

    // function saveData(event) {
    //     event.preventDefault();
    //     console.log('test');
    // }

    const handleClick = e => {
        e.stopPropagation();
        // doesn't do anything except stop the event
    };

    // const handleChange = (event) => {
    //     setReusable(event.target.value);
    // };

    // const handleContainerChange = (event) => {
    //     setContainer(event.target.value);
    // }

    // const handleStackableChange = (event) => {
    //     setStackable(event.target.value);
    // }

    const saveData = async(event) => {
        // event.preventDefault();
        // console.log(theUser);
        console.log(state.userInfo);
        const data = await updateUser(state.userInfo);
        
        if(data.success) {
            
            setState({
                ...initialState,
                successMsg:data.message,
            });

            
          
        }
        window.location.reload();
        
        // console.log(state.partInfo.containerType);
    }

    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }



    const actions = [
        <Button
          type="reset"
          label="Reset"
          secondary={true}
          style={{ float: 'left' }}
          />,
        <Button
          label="Cancel"
          primary={true}
          onClick={handleClose}
          />,
        <Button
          type="submit"
          label="Submit"
          primary={true}
          />,
      ];

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>

            <Dialog
                // disableBackdropClick
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                onClick={handleClick}
            >
            <form onSubmit={saveData}>                
                <DialogTitle>User {data.first_name} {data.last_name}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        name="firstName"
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        defaultValue={state.userInfo.firstName}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="lastName"
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        defaultValue={state.userInfo.lastName}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="email"
                        margin="dense"
                        id="email"
                        label="Email"
                        defaultValue={state.userInfo.email}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Active/Inactive?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="active"
                            defaultValue={state.userInfo.active}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Inactive'>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Admin?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="admin"
                            defaultValue={state.userInfo.admin}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='Yes'>Yes</MenuItem>
                            <MenuItem value='No'>No</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveData}>Save</Button> */}
                    {/* <div>
            {actions}
          </div> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
                </form>
            </Dialog>
            
        </>
        // <>
        //       <IconButton>
        //     <EditIcon />
        //   </IconButton>

        // <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        //     <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        //      Part {data.part_number}
        //     </DialogTitle>
        //     <DialogContent dividers>

        //       <Typography component={'span'} gutterBottom>
        //           <p>
        //           <b>Vendor Name: </b>
        //         {data.vendor}
        //         </p>
        //         <p>
        //             <b>Vendor Number: </b>
        //             {data.vendor_number}
        //         </p>
        //         <p>
        //             <b>Part Description: </b>
        //             {data.description}
        //         </p>
        //         <p>
        //             <b>Weight per Piece: </b>
        //             {data.weight}
        //         </p>
        //         <p>
        //             <b>Weight UOM: </b>
        //             {data.weigh_uom}
        //         </p>
        //         <p>
        //             <b>Quantity per Container: </b>
        //             {data.standard_pack}
        //         </p>
        //         <p>
        //             <b>Reusable Packaging: </b>
        //             {data.reusable}
        //         </p>
        //         <p>
        //             <b>Container Type: </b>
        //             {data.container_type}
        //         </p>
        //         <p>
        //             <b>Container Number: </b>
        //             {data.container_number}
        //         </p>
        //         <p>
        //             <b>Container Dims: </b>
        //             {data.length} x {data.width} x {data.height}
        //         </p>
        //         <p>
        //             <b>Container UOM: </b>
        //             {data.container_uom}
        //         </p>
        //         <p>
        //             <b>Stackable: </b>
        //             {data.stackable}
        //         </p>
        //       </Typography>


        //     </DialogContent>
        //     <DialogActions>
        //       <Button autoFocus onClick={handleClose} color="primary">
        //         Close
        //       </Button>
        //     </DialogActions>
        //   </Dialog>
        //   </>
    );
}

// export default PartInfo;
