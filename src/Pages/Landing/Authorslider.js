import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';


function Authorslider() {
    const [data, setPopulate] = useState([])
    const nav = useNavigate()

    const sendetails = (data) => {
        nav('/Auth', { state: { data } })
    }
    const getData = async () => {
        const data = await fetch("http://localhost:4000/authors")
        const authors = await data.json()
        setPopulate(authors)
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <Box>
            <Box>
                <Carousel animation="slide" cycleNavigation="true">
                    {[1, 2].map((item,index) => {
                        return <div key={index} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {data.slice(0, 6).map((data,index) => {
                                return (
                                    <Box key={index}>
                                        <Paper variant='outlined' sx={{ minWidth: 270, marginLeft: "15px", minheight: 300 }}>
                                            <Card >
                                                <CardContent >
                                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                        <Typography variant="h6" sx={{ mr: 1 }} >
                                                            {data.firstName}
                                                        </Typography>
                                                        <Typography variant="h6" >
                                                            {data.lastName}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="h7" >
                                                        Contact-{data.phone}
                                                    </Typography>
                                                    <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>

                                                        <Button variant="outlined" onClick={() => sendetails(data)} >Details</Button>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    </Box>
                                )

                            }
                            )

                            }
                        </div>
                    })
                    }
                </Carousel>


            </Box>
            {/* <Box sx={{display:"flex",justifyContent:"center" ,mt:"20px"}}>

           <Pagination count={10} onClick={handlepagination} />
    </Box> */}
        </Box>
    )

}

export default Authorslider
