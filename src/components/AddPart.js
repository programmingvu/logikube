import React, { useContext, useState, useEffect } from 'react'
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
import HistoryIcon from '@material-ui/icons/History';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

export default function AddPart({ open, onClose }) {

    const initialState = {
        partInfo: {
            vendorName: "",
            vendorNumber: "",
            partNumber: "",
            partDescription: "",
            weight: "",
            weightUOM: "lbs",
            quantity: "",
            reusable: "",
            containerType: "",
            containerNumber: "",
            length: "",
            width: "",
            height: "",
            containerUOM: "in",
            stackable: "",
            active: "",
        },
        errorMsg:'',
        successMsg:''
    }

    // const {rootState,getAudit} = useContext(MyContext);
    const { addPart, rootState } = useContext(MyContext);

    const classes = useStyles();

    // const [open, setOpen] = useState(false);
    const [state, setState] = useState(initialState);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    

    const savePart = async(event) => {
        // event.preventDefault();
        // console.log(theUser);
        console.log(state.partInfo);
        const data = await addPart(state.partInfo);
        console.log(data);
        if(data.success) {
            
            setState({
                ...initialState,
                successMsg:data.message,
            });

            
          
        }
        // window.location.reload();
        
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

    // const handleClickOpenPart = async (e) => {
    //     e.stopPropagation();
    //     console.log('test');
    //     setOpen(true);
        
    //     // await getAudit(data);
    // };

    // const handleClosePart = e => {
    //     e.stopPropagation();
    //     setOpen(false);
    // };

    // const {audit} = rootState;     
    // useEffect(() => {
    //   getAudit();
    // }, []);

    // console.log(audit);
    return (
        <>
            {/* <IconButton onClick={handleClickOpenPart}>
                <HistoryIcon />
            </IconButton> */}

            <Dialog
                // disableBackdropClick
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={onClose}

            >
                <form onSubmit={savePart}> 
                <DialogTitle id="customized-dialog-title" onClose={onClose}>
                    Add New Part
        </DialogTitle>
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
                        required
                    />

                    <TextField
                        name="vendorNumber"
                        margin="dense"
                        id="vendor_number"
                        label="Vendor Number"
                        defaultValue={state.partInfo.vendorNumber}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <TextField
                        name="partNumber"
                        margin="dense"
                        id="part_number"
                        label="Part Number"
                        defaultValue={state.partInfo.partNumber}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <TextField
                        name="partDescription"
                        margin="dense"
                        id="part_description"
                        label="Part Description"
                        defaultValue={state.partInfo.partDescription}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <TextField
                        name="weight"
                        margin="dense"
                        id="weight"
                        label="Weight Per Piece (lbs)"
                        defaultValue={state.partInfo.weight}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />



                    <TextField
                        name="quantity"
                        margin="dense"
                        id="quantity"
                        label="Quantity Per Container"
                        defaultValue={state.partInfo.quantity}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Reusable Package?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="reusable"
                            defaultValue={state.partInfo.reusable}
                            onChange={onChangeValue}
                            required
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
                            required
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
                        required
                    />

                    <TextField
                        name="length"
                        margin="dense"
                        id="length"
                        label="Container Length (in)"
                        defaultValue={state.partInfo.length}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <TextField
                        name="width"
                        margin="dense"
                        id="width"
                        label="Container Width (in)"
                        defaultValue={state.partInfo.width}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <TextField
                        name="height"
                        margin="dense"
                        id="container_height"
                        label="Container Height (in)"
                        defaultValue={state.partInfo.height}
                        fullWidth
                        onChange={onChangeValue}
                        required
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Stackable?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="stackable"
                            defaultValue={state.partInfo.stackable}
                            onChange={onChangeValue}
                            required
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
                            required
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
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
                </form>
            </Dialog>


        </>
    );



}