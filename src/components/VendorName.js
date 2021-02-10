import React, {useContext, useState} from 'react'
import {MyContext} from '../contexts/MyContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function VendorName() {
    const {rootState} = useContext(MyContext);
    const {isAuth,theUser,showLogin,vendorName} = rootState;
    return (
        <AutoComplete
        id="vendor-name"
        options={vendorName}
        getOptionLabel={(option)=>option.vendor}

    rendorInput={(params)=> <TextField
    {...params}
      autoComplete="fname"
      name="vendor_name"
      variant="outlined"
      required
      fullWidth
      id="vendor_name"
      label="Vendor Name"
    //   value={state.partInfo.vendor_name} 
      onChange={onChangeValue}
      autoFocus
    />
    }
    />
    );
  }