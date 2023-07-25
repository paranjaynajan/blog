import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


function Filterdata(props) {

   const fixdata= props.setdata

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box boxShadow={3} sx={{ width: "80%", }}>
                <Container sx={{ padding: "20px", display: "flex", justifyContent: "space-around" }}>
                    <Box>
                        <Button variant='contained' onClick={fixdata.setfun1}>
                            Most Like
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' onClick={fixdata.setfun2}>
                            Most Comment
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Filterdata
