import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Filterdata from './Filterdata';
import Searchdata from './Searchdata';
import Form from '../Post/Addpost/Addpost';




function Functionality(props) {


  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

  };


 
  const [change, setChange] = useState(true)
  const toggle1= () => {
  
    setShow(false)
    setChange(false)
  }
  const toggle2 = () => {
   
    props.setfun5(false)
    setShow(false)
    setChange(true)
  }


  const [show, setShow] = useState(true)
  return (
    <>
      < Alert sx={{ height: "70px", display: "flex", justifyContent: "space-evenly", marginBottom: "50px" }} severity="info" icon={false}>
        <Button variant='outlined' onClick={toggle2} sx={{ marginRight: "100px" }}    >Filter</Button>
        <Button variant='outlined' onClick={toggle1} sx={{ marginLeft: "100px" }}   >Search</Button>
        <Button variant='outlined' sx={{ marginLeft: "200px" }} onClick={handleClickOpen} >Add Post</Button>
      </Alert >
      <Box>
        {show ? <></> : change ? <Filterdata setdata={props} /> : <Searchdata setdata={props} />}
        <Form 
      
          open={open}
          onClose={handleClose}
        />
      </Box>
    </>
  )
}

export default Functionality
