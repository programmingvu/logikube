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

export default function AuditHistory({ data }) {

    const {rootState,getAudit} = useContext(MyContext);
    

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');

    const handleClickOpenAudit = async (e) => {
        e.stopPropagation();
        setOpen(true);
        
        await getAudit(data);
    };

    const handleCloseAudit = e => {
        e.stopPropagation();
        setOpen(false);
    };

    const {audit} = rootState;     
    useEffect(() => {
      getAudit();
    }, []);

    // console.log(audit);
    return (
        <>
            <IconButton onClick={handleClickOpenAudit}>
                <HistoryIcon />
            </IconButton>

            <Dialog
                // disableBackdropClick
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleCloseAudit}
                onClick={handleCloseAudit}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleCloseAudit}>
                    Audit History: Part #{data}
        </DialogTitle>
        <DialogContent>
            <TableContainer>
                <Table className={classes.table} aria-label="audit table">
                <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">UserID</TableCell>
            <TableCell align="right">Log Notes</TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
            {audit.map((a) => (
                <TableRow key={a.id}>
            <TableCell component="th" scope="row">
            {a.date}
              </TableCell>
                    <TableCell align="right">{a.user_id}</TableCell>
                    <TableCell align="right">{a.action}</TableCell>
                </TableRow>
            ))}
        </TableBody>

                </Table>
            </TableContainer>
        </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAudit}>Cancel</Button>
                    {/* <Button type="submit">Save</Button> */}
                </DialogActions>
            </Dialog>


        </>
    );



}