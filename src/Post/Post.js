import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import moment from "moment"
import Pagination from '@mui/material/Pagination';
import Functionality from './Functionality';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Posts(props) {

  const [postdata, setPost] = useState([])

  const[page,setPage]=useState(true)
  const [likepage, setLikepage] = useState(true)
  const [dated,setDated]=useState(0)

  const nav = useNavigate()
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const navigatetopost = (data) => {
    nav('/Postdetails', { state: { data } })
  }



  const handleChange = async (event, value) => {
    let initalpage = 0
    let finalpage = 10
    for (let i = 1; i < value; i++) {
      initalpage = initalpage + 10
      finalpage = finalpage + 10
    }

    const res = await fetch(`http://localhost:4000/posts?_start=${initalpage}&_end=${finalpage}`)
    const post = await res.json()

    for (let i = 0; i < post.length; i++) {
      post[i].ishide = true
    }
    console.log(post)
    setPost(post)
  };



  const pagiLikes =  async(event, value) => {
    const res = await fetch("http://localhost:4000/posts?_sort=numLikes&_order=desc")
    const post = await res.json()

    
    let initalpage = 0
    let finalpage = 10
    for (let i = 1; i < value; i++) {
      initalpage = initalpage + 10
      finalpage = finalpage + 10
    }

    for (let i = 0; i < post.length; i++) {
      post[i].ishide = true
    }
   
    setPost(post.slice(initalpage, finalpage))

  };


  
  const pagiComm = async (event, value) => {
    const res = await fetch("http://localhost:4000/posts?_sort=numComments&_order=desc")
    const post = await res.json()

setLikepage(false)

    let initalpage = 0
    let finalpage = 10
    for (let i = 1; i < value; i++) {
      initalpage = initalpage + 10
      finalpage = finalpage + 10
    }

    for (let i = 0; i < post.length; i++) {
      post[i].ishide = true
    }
    
    setPost(post.slice(initalpage, finalpage))

  };

  const setToggle = (i) => {
    postdata[i].ishide === true ? postdata[i].ishide = false : postdata[i].ishide = true
    setPost([...postdata])
  }

  const Comment = async () => {
    // const commentpost = postdata?.sort(
    //   (a, b) => {
    //     return b.numComments - a.numComments
    //   })

    // console.log(commentpost)
    // setPost([...commentpost])

  }

  const Liked = async () => {
   

    // const likepost = postdata?.sort(
    //   (a, b) => {
    //     return b.numLikes - a.numLikes
    //   })
    // console.log(likepost)
    // setPost([...likepost])
  }

  const findData = async () => {
    
    const res = await fetch("http://localhost:4000/posts?_limit=10")
    const post = await res.json()
  
    for (let i = 0; i < post.length; i++) {
      post[i].ishide = true

    }

    setPost(post)
  }

  const getData = async (e) => {
    const title1 = e.target.value
    const final = title1.charAt(0).toUpperCase() + title1.slice(1)

    // const findpost = postdata.filter((ele) => {
    //   return Object.values(ele).some(val => typeof val === "string" && val.includes(title1))
    // })

    const res = await fetch(`http://localhost:4000/posts?q=${final}`)
    const post = await res.json()
    
    if(post.length!==0){
    setPost(post.slice(0,10))
    }
    else{
      setOpen(true);
    }

  }


  const getDate = async (e) => {
    // const a = document.getElementById("date")
    // console.log(a)
    // const myMomentObject = moment(e.$d).format("YYYY.MM.DD");
    // var date = new Date(myMomentObject);
    // var unixTimeStamp = Math.floor(date.getTime() / 1000);
    // console.log(unixTimeStamp)
    const res = await fetch(`http://localhost:4000/posts`)
  const final =await res.json()
    for (let i = 0; i < final.length; i++) {
      final[i].datePublished = moment(final[i].datePublished).format("MM/DD/YYYY")
    }
    if (final.length !== 0) {
      const date = moment(e?.$d).format("MM/DD/YYYY")

      const findpost = final.filter((ele) => {
        return Object.values(ele).some(val => typeof val === "string" && val.includes(date))
      })
   
      if (findpost.length !== 0) {
        setDated(findpost)
      }
      else {
        setOpen(true);
      }
    }
    else {
      setOpen(true);
    }
    
  
    // const dt=unixTimeStamp.toString()
    // console.log(typeof dt)
    // const final =dt.slice(0,5)
    // console.log(final)
    // const res = await fetch(`http://localhost:4000/posts?q=${final}`)
    // const post = await res.json()
    // console.log(post)
    // setPost(post)


  }
const showDate=async ()=>{
console.log(dated)
if(dated){
  setPost(dated)
}else{

}


}


  useEffect(() => {

    findData()
  }, [])

  const handeldelete = async(i) => {
    console.log(i.id)
  await fetch( `http://localhost:4000/posts/${i.id}` , {
      method: 'delete'
    })
findData()
  }



  return (
    <>
      <Container maxWidth='xl' sx={{ mt: 2, marginTop: "100px" }}>

        {
          postdata?.length == 0 ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <CircularProgress />
          </Box> : <Box>
              <Functionality idofAuthor={props.id} setfun1={pagiLikes} setfun2={pagiComm} setfun3={getData} setfun4={getDate} setfun5={setPage} setfun6={setLikepage} setfun7={showDate}></Functionality>

            {
              postdata?.map((data, index) => {
           
                return <Card sx={{ marginTop: "20px" }} key={index} >
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Avatar alt="Remy Sharp" src={require("../Assets/user.jpeg")} sx={{ height: '110px', width: '100px' }} />
                    <Box>
                      <Typography variant="h5" sx={{ ml: 2, mt: 3, fontWeight: "bold" }} >
                     
                        {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                        {/* {data.title} */}
                      </Typography>

                      {data.ishide === true ?
                        <Box sx={{ ml: 2, mt: 2 }}>
                          <Typography variant="h7"  >
                            {data.description.slice(0, 250)}
                          </Typography>
                          <span onClick={() => setToggle(index)} style={{ color: "blue" }} >
                            {data.ishide === true ? "..." : " show less"}
                          </span>

                        </Box> : <Box sx={{ ml: 2, mt: 2 }}>
                          <Typography variant="h7"  >
                            {data.description}
                          </Typography>
                          <span onClick={() => setToggle(index)} style={{ color: "blue" }} >
                            {data.ishide === true ? "..." : " show less"}
                          </span>
                        </Box>}

                    </Box>

                  </Box>
                  <CardContent >
                    <Box >
                      <Box sx={{ display: "flex", margin: "10px" }}>

                        <ThumbUpIcon color='primary' />
                        <Typography variant="h5" sx={{ ml: 1, mr: 5, textAlign: "center", position: "relative", bottom: "4px" }} >
                          {data.numLikes}
                        </Typography>


                        <QuestionAnswerIcon />
                        <Typography variant="h5" sx={{ ml: 1, mr: 5, textAlign: "center", position: "relative", bottom: "4px" }} >
                          {data.numComments}
                        </Typography>


                      </Box>
                      <Typography variant="h6" sx={{ m: 1, }} >
                        Date of Publication-
                        {moment(data?.datePublished).format("MM/DD/YYYY")}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} >
                      <Box>

                        <Button sx={{ ml: 2, mt: 1 }} onClick={() => navigatetopost(data)} variant='contained'>Know more</Button>

                      </Box>

                      <Box>

                        <DeleteIcon sx={{ ml: 2, mt: 2 }} onClick={() => handeldelete(data)}></DeleteIcon>

                      </Box>
                    </Box>

                  </CardContent>
                </Card>
              })
            }

          </Box>
          
        }
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >

          <Box boxShadow={5} >
            <Alert icon={false} sx={{ backgroundColor: "#1976d2", color: "white", width: "500px" }} severity="info">

              <Typography variant="h6">
              Sorry Could not found
              </Typography>

            </Alert>
          </Box>




        </Snackbar>
      </Container>
      
      {page?<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
        <Pagination count={500}
          onChange={handleChange} /></Box> : likepage ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
          <Pagination count={500}
            onChange={pagiLikes} /></Box> : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
            <Pagination count={500}
              onChange={pagiComm} /></Box>
      }
    </>
  )
}

export default React.memo(Posts)
