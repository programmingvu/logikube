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

export default function EditPart({ data }) {
    // const PartInfo = props => {
    //   const [open] = React.useState(false);
    const classes = useStyles();
    const { updatePart, rootState } = useContext(MyContext);

    const initialState = {
        partInfo: {
            vendorName: data.vendor,
            vendorNumber: data.vendor_number,
            partNumber: data.part_number,
            partDescription: data.description,
            weight: data.weight,
            weightUOM: data.weigh_uom,
            quantity: data.standard_pack,
            reusable: data.reusable,
            containerType: data.container_type,
            containerNumber: data.container_number,
            length: data.length,
            width: data.width,
            height: data.height,
            containerUOM: data.container_uom,
            stackable: data.stackable,
            active: data.active,
        },
        errorMsg:'',
        successMsg:''
    }
    
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
        console.log(state.partInfo);
        const data = await updatePart(state.partInfo);
        
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
            partInfo:{
                ...state.partInfo,
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
                <DialogTitle>Part {data.part_number}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        name="vendorName"
                        margin="dense"
                        id="vendor_name"
                        label="Vendor Name"
                        defaultValue={state.partInfo.vendorName}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="vendorNumber"
                        margin="dense"
                        id="vendor_number"
                        label="Vendor Number"
                        defaultValue={state.partInfo.vendorNumber}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="partNumber"
                        margin="dense"
                        id="part_number"
                        label="Part Number"
                        defaultValue={state.partInfo.partNumber}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="partDescription"
                        margin="dense"
                        id="part_description"
                        label="Part Description"
                        defaultValue={state.partInfo.partDescription}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="weight"
                        margin="dense"
                        id="weight"
                        label="Weight Per Piece"
                        defaultValue={state.partInfo.weight}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Weight UOM</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="weightUOM"
                            defaultValue={state.partInfo.weightUOM}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='lbs'>lb</MenuItem>
                            <MenuItem value='kg'>kg</MenuItem>
                            <MenuItem value='g'>g</MenuItem>
                            <MenuItem value='oz'>oz</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="quantity"
                        margin="dense"
                        id="quantity"
                        label="Quantity Per Container"
                        defaultValue={state.partInfo.quantity}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Reusable Package?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="reusable"
                            defaultValue={state.partInfo.reusable}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='yes'>Yes</MenuItem>
                            <MenuItem value='no'>No</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Container Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="containerType"
                            defaultValue={state.partInfo.containerType}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='barrel'>Barrel</MenuItem>
                            <MenuItem value='bin'>Bin</MenuItem>
                            <MenuItem value='box'>Box</MenuItem>
                            <MenuItem value='bundle'>Bundle</MenuItem>
                            <MenuItem value='carton'>Carton</MenuItem>
                            <MenuItem value='case'>Case</MenuItem>
                            <MenuItem value='create'>Crate</MenuItem>
                            <MenuItem value='cylinder'>Cylinder</MenuItem>
                            <MenuItem value='drum'>Drum</MenuItem>
                            <MenuItem value='rack'>Rack</MenuItem>
                            <MenuItem value='roll'>Roll</MenuItem>
                            <MenuItem value='tote'>Tote</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="containerNumber"
                        margin="dense"
                        id="container_number"
                        label="Container Number"
                        defaultValue={state.partInfo.containerNumber}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="length"
                        margin="dense"
                        id="length"
                        label="Container Length"
                        defaultValue={state.partInfo.length}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="width"
                        margin="dense"
                        id="width"
                        label="Container Width"
                        defaultValue={state.partInfo.width}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <TextField
                        name="height"
                        margin="dense"
                        id="container_height"
                        label="Container Height"
                        defaultValue={state.partInfo.height}
                        fullWidth
                        onChange={onChangeValue}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Container UOM</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="containerUOM"
                            defaultValue={state.partInfo.containerUOM}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='mm'>mm</MenuItem>
                            <MenuItem value='cm'>cm</MenuItem>
                            <MenuItem value='m'>m</MenuItem>
                            <MenuItem value='in'>in</MenuItem>
                            <MenuItem value='lbs'>lbs</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Stackable?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="stackable"
                            defaultValue={state.partInfo.stackable}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='yes'>Yes</MenuItem>
                            <MenuItem value='no'>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Active/Inactive?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="active"
                            defaultValue={state.partInfo.active}
                            onChange={onChangeValue}
                        >
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Inactive'>Inactive</MenuItem>
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
