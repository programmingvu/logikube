import React, {useContext, useState} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import {MyContext} from '../contexts/MyContext'
import EditIcon from "@material-ui/icons/Edit";
import Typography from '@material-ui/core/Typography';

export default function PartInfo({data, open, handleClose}) {
    // const PartInfo = props => {
//   const [open] = React.useState(false);
const { getPart } = useContext(MyContext);

const initialState = {
    partNumber:'',      
  }

  const [state,setState] = useState(initialState);
// const part = {data};
// console.log(data);
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
//   const handleClickOpen = e => {
//     e.stopPropagation();
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleClick = e => {
//     e.stopPropagation();
//     // doesn't do anything except stop the event
//   };

  return (
    // <>
    //   <IconButton onClick={handleClickOpen}>
    //     <EditIcon />
    //   </IconButton>
    //   <Dialog
    //     disableBackdropClick
    //     open={open}
    //     onClose={handleClose}
    //     onClick={handleClick}
    //   >
    //     <DialogTitle>Dialog</DialogTitle>
    //     <DialogContent>Some content</DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose}>Cancel</Button>
    //       <Button onClick={handleClose}>Save</Button>
    //     </DialogActions>
    //   </Dialog>
    // </>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         Part {data.part_number}
        </DialogTitle>
        <DialogContent dividers>

          <Typography component={'span'} gutterBottom>
              <p>
              <b>Vendor Name: </b>
            {data.vendor}
            </p>
            <p>
                <b>Vendor Number: </b>
                {data.vendor_number}
            </p>
            <p>
                <b>Part Description: </b>
                {data.description}
            </p>
            <p>
                <b>Weight per Piece: </b>
                {data.weight}
            </p>
            <p>
                <b>Weight UOM: </b>
                {data.weigh_uom}
            </p>
            <p>
                <b>Quantity per Container: </b>
                {data.standard_pack}
            </p>
            <p>
                <b>Reusable Packaging: </b>
                {data.reusable}
            </p>
            <p>
                <b>Container Type: </b>
                {data.container_type}
            </p>
            <p>
                <b>Container Number: </b>
                {data.container_number}
            </p>
            <p>
                <b>Container Dims: </b>
                {data.length} x {data.width} x {data.height}
            </p>
            <p>
                <b>Container UOM: </b>
                {data.container_uom}
            </p>
            <p>
                <b>Stackable: </b>
                {data.stackable}
            </p>
          </Typography>


        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}

// export default PartInfo;
