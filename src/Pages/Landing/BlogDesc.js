import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import authors from '../../Utils/Authors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function BlogDesc() {
    return (
         <Box sx={{marginTop:"100px" ,marginBottom:"50px"}}>
            <Grid container spacing={0}>
                <Grid item lg={6}>
                    <Box >
                        <Box sx={{textAlign:"center"}}>
                            <img src={require("../../Assets/user.jpeg")} style={{
                                height: "250px",
                                width: "250px",
                                border: "1px solid black"}} />
                        </Box>
                        <Box sx={{ textAlign: "center" }}>  
                         <Typography variant="h6" sx={{ mr: 1 }} >
                           Blog creater
                        </Typography> </Box>  
                        <Typography variant="h7" sx={{
                            color: "Black",
                            m: 1
                        }} >
                           
                            <Box sx={{ textAlign:"justify"}}>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                                a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                            </Box>
                          
                        </Typography>
                        
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ textAlign: "center" }}>

                        <Box sx={{ justifyContent: "center" }}>
                            <Typography variant="h6" sx={{ mr: 1 }} >
                                Top Users
                            </Typography>
                            {authors.slice(0,2).map((data,index) => {
                                return (
                                    <Box key={index} sx={{ width:"100%", margin: "15px", minheight: 300,border:"1px solid black" }}>
                                        <Card  elevation={0}   >
                                            <CardContent sx={{ display: "flex", justifyContent: "space-between" }} >
                                                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                                    <Typography variant="h6" sx={{ mr: 1 }} >
                                                        {index + 1}. {data.firstName}
                                                    </Typography>
                                                    
                                                </Box>
                                                <Box sx={{ display: "flex"}}>
                                                    <ArrowForwardIcon/>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                        
                                    </Box>
                                )

                            })

                            }
                        </Box>

                    </Box>
                </Grid>

            </Grid>

      </Box>
       
    )
}

export default BlogDesc
