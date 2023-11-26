import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';




function Authors(props) {
    const nav = useNavigate()
    const [populateauthors, setPopulate] = useState([])

    const handleChange = async (event, value) => {
        let initalpage = 0
        let finalpage = 12
        for (let i = 1; i < value; i++) {
            initalpage = initalpage + 12
            finalpage = finalpage + 12
        }

        const res = await fetch(`http://localhost:4000/authors?_start=${initalpage}&_end=${finalpage}`)
        const author = await res.json()

        for (let i = 0; i < author.length; i++) {
            author[i].ishide = true
        }
       
      setPopulate(author)


    };




const getData=async()=>{
    const data = await fetch("http://localhost:4000/authors?_limit=12")
    const authors=await data.json()
   setPopulate(authors)
}


useEffect(()=>{

getData()
},[])

const sendetails=(data)=>{
    
    nav('/Auth',{state:{data}})
}
  return (
    
    <>

          {populateauthors.length==0?<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",marginTop:"100px"}}>
                  <CircularProgress  />
              </Box> :
      <Box sx={{ display: "grid",gridTemplateColumns:"3fr 3fr 3fr 3fr 3fr 3fr" ,gridGap:"10px",marginTop:"100px"}}>
         {populateauthors?.map((data,i)=>{
             return  <Card sx={{margin:"10px"}} key={i} >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar alt="Remy Sharp" src={require("../Assets/user.jpeg")} sx={{ height: '150px', width: '150px' }} />
              </Box>
              <CardContent >
                  <Box >
                      <Typography variant="h6" sx={{ mr: 1 ,textAlign:"center"}} >
                    {data.firstName} {data.lastName}
                      </Typography>

                     <Typography  sx={{ m: 1, textAlign: "center" }} >
                        Contact- {data.phone} 
                     </Typography>
                         <Box sx={{display:"flex",justifyContent:"space-around",margin:"10px"}}> 
                          <Box>
                            
                           
                                <ThumbUpIcon color='primary' />
                             <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                 {data.numLikes}
                             </Typography>
                            </Box>  
                            <Box>
                             
                              <QuestionAnswerIcon />
                             <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                 {data.numComments}
                             </Typography>
                            </Box>
                             <Box>
                             
                             <NoteAltOutlinedIcon color='primary' />
                             <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                 {data.numPosts}
                             </Typography>
                             </Box>
                            </Box>
                      
                  </Box>
                  <Typography variant="h7" >
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                     <Button variant="contained" onClick={()=>sendetails(data)} >Details</Button>
                  </Box>
              </CardContent>
             </Card>
         })}
              </Box> 
    }
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
              <Pagination count={84}
                  onChange={handleChange} /></Box>


    
         </>
  )
}

export default Authors
