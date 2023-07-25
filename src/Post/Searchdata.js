import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import post from "../Utils/Post"
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment"

function Searchdata(props) {


    
    const fixdata = props.setdata

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "80%", }}>
                <Container sx={{ padding: "20px", display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography variant="h5" sx={{ marginTop: "12px", mr: 1 }}>
                            Search Title:
                        </Typography>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Item"
                                inputProps={{ 'aria-label': 'search google maps' }} 
                                onChange={fixdata.setfun3}
                            />
                            {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                <SearchIcon />
                            </IconButton> */}


                        </Paper>
                    </Box>
                    <Box sx={{  display: "flex", flexWrap:"wrap" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Typography variant="h5" sx={{marginTop:"12px",mr:1}}>
                               Date:
                            </Typography>
                            <DatePicker id="date" onChange={fixdata.setfun4} />
                        </LocalizationProvider>
                    </Box>
                    <Button variant='contained' onClick={fixdata.setfun7}>Search By date</Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Searchdata
