import React,{useContext, useState, useMemo, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
// import { makeStyles } from '@material-ui/core/styles';
import {MyContext} from '../contexts/MyContext'
import PartInfo from './PartInfo';
import EditUser from './EditUser';
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
    // { id: '', numeric: false, disablePadding: true, label: 'Edit' },
    { id: 'active', numeric: false, disablePadding: false, label: 'Active/Inactive' },
    { id: 'admin', numeric: false, disablePadding: false, label: 'Admin' },
    { id: 'first_name', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },

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
    // console.log(props);
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { items } = props;
    
    // const handleActiveClick = name => () => {
    //   console.log(name);
    // }
  
    const handleActiveClick = async(event) => {
      // const data = await setActive(items);
      // console.log(items);
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
            Users
          </Typography>
        )}
    {/* <AppMenu /> */}
        {numSelected > 0 ? (
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
         )}
                   <Tooltip title="Delete">
            {/* <IconButton aria-label="delete">
              <RemoveIcon />
            </IconButton> */}
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    parts: PropTypes.number.isRequired
  };

  export default function UserList() {

    const {rootState, getUsers} = useContext(MyContext);

 
    const {users, theUser} = rootState;     
    useEffect(() => {
      getUsers();
    }, []);
    // console.log(users); 
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
    // console.log(tableData);
    useEffect(() => {
      setTableData(users);
    }, [users])
    
    const handleClickOpen = (name) => {
      setOpen(true);
      setPart(name);
    };
    const handleCheckboxClick = () => {
      // console.log('test');
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
        const newSelecteds = users.map((n) => n.id);
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
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

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
        ? users.filter(r => r.active === event.target.value)
        : users;
        // console.log(_vals);
      setTableData(_vals);
    }

    
    // console.log(selected);
    return (
      
      <div className={classes.root}>
        

      
              <SearchAppBar data={users} handleChange={handleChange} selectedItem={selectedItem}/>
      

        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} items={selected}/>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
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
                rowCount={users.length}
              />
              <TableBody>
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    
                    const labelId = `enhanced-table-checkbox-${index}`;
                    // console.log(parts);
                    return (
                      

                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        onClick={() => handleClickOpen(row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        gettrprops={row}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                          onClick={event => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        {/* <TableCell align="center"><EditUser data={row}/></TableCell> */}
                        <TableCell align="center">{row.active}</TableCell>

                        <TableCell align="center">{row.admin}</TableCell>                        
                        <TableCell align="center">{row.first_name}</TableCell>

                        <TableCell align="center">{row.last_name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.company}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>


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


{/* <PartInfo functions={[open, setOpen,part]}/> */}
{/* <PartInfo data={part} open={open} handleClose={handleClose}/> */}
      </div>

      

      
    );
  }

