import React,{useContext, useState, useMemo, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
// import { makeStyles } from '@material-ui/core/styles';
import {MyContext} from '../contexts/MyContext'
import PartInfo from './PartInfo';
import EditPart from './EditPart';
import AuditHistory from './AuditHistory';
import AppMenu from './Menu';
import SearchAppBar from './SearchAppBar';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import FilterListIcon from '@material-ui/icons/FilterList';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import UserProfile from './UserProfile';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
// const columns = [
//   { field: 'edit', headerName: '', width: 70 },
//   { field: 'active', headerName: 'Active/Inactive*', width: 130 },

//   { field: 'vendor', headerName: 'Vendor Name*', width: 250 },

//   {
//     field: 'vendor_number',
//     headerName: 'Vendor Number*',
//     type: 'number',
//     width: 130,
//   },
//   {
//     field: 'id',
//     headerName: 'Part Number*',
//     type: 'number',
//     width: 130,
//   },
//   { field: 'description', headerName: 'Part Description', width: 250, sortable: false },
//   { field: 'date_modified', headerName: 'Date modified*', width: 175 },
//   { field: 'modified_by', headerName: 'Modified by*', width: 130 }
// ];
// const columns = [
//   { field: 'edit', headerName: '', width: 70 },
//   { field: 'active', headerName: 'Active/Inactive*', width: 130 },
//   { field: 'date_modified', headerName: 'Date modified*', width: 175 },
//   { field: 'modified_by', headerName: 'Modified by*', width: 130 },
//   { field: 'vendor', headerName: 'Vendor Name*', width: 250 },

//   {
//     field: 'vendor_number',
//     headerName: 'Vendor Number*',
//     type: 'number',
//     width: 130,
//   },
//   {
//     field: 'id',
//     headerName: 'Part Number*',
//     type: 'number',
//     width: 130,
//   },
//   { field: 'description', headerName: 'Part Description', width: 250, sortable: false },
//   { field: 'weight', headerName: 'Weight per Piece', width: 130, sortable: false },
//   { field: 'weigh_uom', headerName: 'Weight UOM', width: 130, sortable: false },
//   { field: 'containers_per_truck', headerName: 'Quantity per Container', width: 130, sortable: false },
//   { field: 'reusable', headerName: 'Reuseable Packaging', width: 130, sortable: false },
//   { field: 'container_type', headerName: 'Container Type*', width: 130 },
//   { field: 'container_number', headerName: 'Container Number*', type: 'number', width: 130 },
//   { field: 'length', headerName: 'Length', width: 130, sortable: false },
//   { field: 'width', headerName: 'Width', width: 130, sortable: false },
//   { field: 'height', headerName: 'Height', width: 130 },
  
// //     {
// //     field: 'dims',
// //     headerName: 'Container Dims (LxWxH)',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (params) =>
// //       `${params.getValue('reusable') || ''} ${params.getValue('weight') || ''}`,
// //   },
//   { field: 'container_uom', headerName: 'Container UOM', width: 130, sortable: false },
//   { field: 'stackable', headerName: 'Stackable?', width: 130, sortable: false },
//   { field: 'Audit', headerName: '', width: 70 },
// //   {
// //     field: 'fullName',
// //     headerName: 'Full name',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (params) =>
// //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
// //   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: '', numeric: false, disablePadding: true, label: 'Edit' },
    { id: 'active', numeric: true, disablePadding: false, label: 'Active/Inactive' },
    { id: 'vendor', numeric: false, disablePadding: false, label: 'Vendor Name' },
    { id: 'vendor_number', numeric: true, disablePadding: false, label: 'Vendor Number' },
    { id: 'id', numeric: true, disablePadding: false, label: 'Part Number' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'date_modified', numeric: true, disablePadding: false, label: 'Date Modified' },
    { id: 'modified_by', numeric: false, disablePadding: false, label: 'Modified By' },
    { id: 'audit', numeric: false, disablePadding: false, label: 'Audit History' },
  ];

  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              align="center"
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  const EnhancedTableToolbar = (props) => {
    console.log(props);
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { items } = props;
    
    // const handleActiveClick = name => () => {
    //   console.log(name);
    // }
  
    const handleActiveClick = async(event) => {
      // const data = await setActive(items);
      console.log(items);
    }

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Parts
          </Typography>
        )}
    {/* <AppMenu /> */}
        {/* {numSelected > 0 ? (
          <Tooltip title="Remove">
            <IconButton aria-label="remove" onClick={handleActiveClick}>
              <RemoveIcon />
            </IconButton>
          </Tooltip>

         ) : (
           
           <Tooltip title="Filter list">
             <IconButton aria-label="filter list">
               <FilterListIcon />
             </IconButton>
           </Tooltip>
         )} */}
                   {/* <Tooltip title="Delete"> */}
            {/* <IconButton aria-label="delete">
              <RemoveIcon />
            </IconButton> */}
            {/* <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    parts: PropTypes.number.isRequired
  };

  export default function Parts() {

    const {rootState, getParts} = useContext(MyContext);

 
    const {parts, theUser} = rootState;     
    useEffect(() => {
      getParts();
    }, []);
    // console.log(theUser.first_name); 
    // console.log(UserProfile.getName());
  

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open,setOpen] = React.useState(false);
    const [part, setPart] = React.useState('');
    // const [part] = React.useState(null);

    const [tableData, setTableData] = React.useState([]);
    console.log(tableData);
    useEffect(() => {
      setTableData(parts);
    }, [parts])
    
    const handleClickOpen = (name) => {
      setOpen(true);
      setPart(name);
    };
    const handleCheckboxClick = () => {
      console.log('test');
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = parts.map((n) => n.part_number);
        setSelected(newSelecteds);
        
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      event.stopPropagation();
      const selectedIndex = selected.indexOf(name);
      
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        // console.log(newSelected);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, parts.length - page * rowsPerPage);

    const gettrprops = (state, rowInfo, instance) => {
      if (rowInfo) {
        return {
          style: {
            background: rowInfo.active == "Active" ? 'red' : 'green',
            color: 'white'
          }
        }
      }
      return {};
    }
    const [selectedItem, setSelectedItem] = React.useState("");
    function handleChange(event) {
      // console.log(event);
      setSelectedItem(event.target.value);
      let _vals = event.target.value
        ? parts.filter(r => r.active === event.target.value)
        : parts;
        // console.log(_vals);
      setTableData(_vals);
    }

    
    console.log(selected);
    return (
      
      <div className={classes.root}>
        
              {/* <label value="Toggle Active: ">Toggle Active: </label>
      <Select
        style={{ width: "30%" }}
        value={selectedItem}
        onChange={handleChange}
        name="active"
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value="">All Parts</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
        
      </Select> */}
      
              <SearchAppBar style={{ backgroundColor: '#bf2126' }} data={parts} handleChange={handleChange} selectedItem={selectedItem}/>
      

        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} items={selected}/>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={parts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={parts.length}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.part_number);
                    
                    const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log(parts);
                    return (
                      
                      // (row.active === "Active") &&
                      // (
                      //   <TableRow
                      //   hover
                      //   // onClick={(event) => handleClick(event, row.id)}
                      //   onClick={() => handleClickOpen(row)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      //   tabIndex={-1}
                      //   key={row.part_number}
                      //   selected={isItemSelected}
                      // >
                      //   <TableCell padding="checkbox">
                      //     <Checkbox
                      //     onClick={event => handleClick(event, row.part_number)}
                      //       checked={isItemSelected}
                      //       inputProps={{ 'aria-labelledby': labelId }}
                      //     />
                      //   </TableCell>
                      //   <TableCell align="center"><EditPart data={row}/></TableCell>
                      //   <TableCell align="center">{row.active}</TableCell>

                      //   <TableCell align="center">{row.vendor}</TableCell>                        
                      //   <TableCell align="center">{row.vendor_number}</TableCell>
                      //   <TableCell component="th" id={labelId} scope="row" padding="none">
                      //     {row.part_number}
                      //   </TableCell>

                      //   <TableCell align="center">{row.description}</TableCell>
                      //   <TableCell align="center">{row.date_modified}</TableCell>
                      //   <TableCell align="center">{row.modified_by}</TableCell>
                      // </TableRow>
                      // )

                      // (row.active === "inactive") && (
                      //   <TableRow
                      //   hover
                      //   // onClick={(event) => handleClick(event, row.id)}
                      //   onClick={() => handleClickOpen(row)}
                      //   role="checkbox"
                      //   aria-checked={isItemSelected}
                      //   tabIndex={-1}
                      //   key={row.part_number}
                      //   selected={isItemSelected}
                      // >
                      //   <TableCell padding="checkbox">
                      //     <Checkbox
                      //     onClick={event => handleClick(event, row.part_number)}
                      //       checked={isItemSelected}
                      //       inputProps={{ 'aria-labelledby': labelId }}
                      //     />
                      //   </TableCell>
                      //   <TableCell align="center"><EditPart data={row}/></TableCell>
                      //   <TableCell align="center">{row.active}</TableCell>

                      //   <TableCell align="center">{row.vendor}</TableCell>                        
                      //   <TableCell align="center">{row.vendor_number}</TableCell>
                      //   <TableCell component="th" id={labelId} scope="row" padding="none">
                      //     {row.part_number}
                      //   </TableCell>

                      //   <TableCell align="center">{row.description}</TableCell>
                      //   <TableCell align="center">{row.date_modified}</TableCell>
                      //   <TableCell align="center">{row.modified_by}</TableCell>
                      // </TableRow>
                      // )
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        onClick={() => handleClickOpen(row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.part_number}
                        selected={isItemSelected}
                        gettrprops={row}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                          onClick={event => handleClick(event, row.part_number)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell align="center"><EditPart data={row}/></TableCell>
                        <TableCell align="center">{row.active}</TableCell>

                        <TableCell align="center">{row.vendor}</TableCell>                        
                        <TableCell align="center">{row.vendor_number}</TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.part_number}
                        </TableCell>

                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.date_modified}</TableCell>
                        <TableCell align="center">{row.modified_by}</TableCell>
                        <TableCell align="center"><AuditHistory data={row.part_number} /></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={parts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}

{/* <PartInfo functions={[open, setOpen,part]}/> */}
<PartInfo data={part} open={open} handleClose={handleClose}/>
      </div>

      

      
    );
  }



//   export default function Parts() {
      
//     // const [data, setData] = useState({items: []});
// const {rootState, getParts} = useContext(MyContext);
// // getParts();
// const {parts} = rootState;
// console.log(parts);


//     return (
//     //   <div style={{ height: 800, width: '100%' }}>
//     //     <DataGrid rows={parts} columns={columns} pageSize={15} checkboxSelection />
//     //   </div>
//     // );
//   }