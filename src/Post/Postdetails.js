

import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import moment from "moment"
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl'






const Postdetails = () => {

  let local = useLocation()
  const data = local.state.data

  const [value, setValue] = React.useState(0);
  const [likepost, setLikes] = useState([])
  const [commentpost, setComments] = useState([])
  const [change, setChange] = useState(true)
  const [authorpost, setAuthor] = useState([])
  const [edit, setEdit] = useState(false)
  const [updatepost, setUpdate] = useState("")
  const [show, setShow] = useState(true)

  const handleChange = (event, newValue) => {
    console.log("val", newValue)
    if (newValue === 0) {

      setValue(newValue);
      setChange(true)
    }
    else {

      setChange(false)
      setValue(newValue);

    }
  };






  // const like = () => {
  // const dataofLikes = likepost.filter((e) => { return e.postId == data.id })
  // dataofLikes.map((ele) => {
  //   console.log("Likes")
  //   const data = authorpost.find((e) => { return ele.authorId == e.id })
  //   const final1 = data.firstName + " " + data.lastName
  //   ele.name = final1

  // })
  // setLikes(dataofLikes)

  // }

  // const comment = () => {
  //   console.log("comment data")
  //   // const dataofcomment = commentpost.filter((e) => { return e.postId == data.id })

  //   // dataofcomment.map((ele) => {

  //   //   const data = authorpost.find((e) => { return ele.authorId == e.id })
  //   //   const final1 = data.firstName + " " + data.lastName
  //   //   ele.name = final1

  //   // })
  //   // setComments(dataofcomment)
  // }

  const liked = (authorData, likedData) => {
    const dataofLikes = likedData?.filter((e) => { return e.postId == data.id })

    dataofLikes.map((ele) => {
      const name = authorData?.find((e) => { return ele.authorId == e.id })
      const final1 = name?.firstName + " " + name?.lastName

      ele.name = final1

    })

    setLikes(dataofLikes)


  }
 
  const comments = (authorData, commentData) => {
 
    const dataComm = commentData?.filter((e) => { return e.postId == data.id })

    dataComm.map((ele) => {
      const name = authorData?.find((e) => { return ele.authorId == e.id })

      const final1 = name?.firstName + " " + name?.lastName

      ele.name = final1

    })

    setComments(dataComm)


  }




  function TabPanel(props) {
    const { children, value, index } = props;
    return (
      <div>
        {value === index && (
          <Box>
            {change ?
              likepost.map((data, index) => {
                return <Box key={index} sx={{ borderBottom: 1, borderColor: 'divider', p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Avatar alt="Remy Sharp" src={require("/Users/paranjaynajan/Desktop/Learning/Blog/blog/src/Assets/user.jpeg")} sx={{ height: '50px', width: '50px' }} />
                    <Box>
                      <Typography variant="h5" sx={{ ml: 2, fontWeight: "bold" }} >
                        {data.name}
                      </Typography>
                      <Box sx={{ ml: 2, }}>
                        <Typography variant="h7"  >
                          Date-  {moment(data?.datePublished).format("DD/MM/YY")}
                        </Typography>

                      </Box>

                    </Box>

                  </Box>
                </Box>
              }) : commentpost.map((data, index) => {
                return <Box key={index} sx={{ borderBottom: 1, borderColor: 'divider', p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Avatar alt="Remy Sharp" src={require("/Users/paranjaynajan/Desktop/Learning/Blog/blog/src/Assets/user.jpeg")} sx={{ height: '50px', width: '50px' }} />
                    <Box>
                      <Typography variant="h5" sx={{ ml: 2, fontWeight: "bold" }} >
                        {data.name}
                      </Typography>
                      <Box sx={{ ml: 2, }}>
                        <Typography variant="h6"  >
                          Comment- {data.text}
                        </Typography>

                      </Box>
                      <Box sx={{ ml: 2, }}>
                        <Typography variant="h7"  >
                          Date-  {moment(data?.datePublished).format("DD/MM/YY")}
                        </Typography>

                      </Box>

                    </Box>

                  </Box>
                </Box>
              })
            }
          </Box>
        )}
      </div>
    );
  }



  const fetchAuthers = async () => {
    const response = await fetch("http://localhost:4000/authors")
    var author = await response.json();
    const authorofpost = author.filter((e) => { return e.id == data.authorId })
    setAuthor(authorofpost)

    const getLikes = await fetchLikes(author)

    const getComment = await fetchComments(author)
  }
  const fetchComments = async (author) => {
    const response3 = await fetch("http://localhost:4000/comments")
    var comment = await response3.json();
    comments(author, comment)


  }
  const fetchLikes = async (author) => {
    const response2 = await fetch("http://localhost:4000/likes")
    var likes = await response2.json();
    liked(author, likes);


  }





  const fetchAllData = async () => {
    const getAuthers = await fetchAuthers()
  }




  const editPost = () => {
    console.log("editing....")
    // fetch(`http://localhost:4000/posts/${i.id}`, {
    //   method: 'put'
    // })
    setEdit(!edit)
  }

  useEffect(() => {
    fetchAllData()



  }, [])
  const update = (e) => {

    setUpdate(e.target.value)

  }
  const handelUpdate = async () => {
    console.log(data.id)
    console.log(updatepost)
    
    await fetch(`http://localhost:4000/posts/${data.id}`, 
    {
      method: 'PATCH', 
      mode: 'cors', 
      body: JSON.stringify({ description: updatepost }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    )
    // methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    // headers: {
    //"Access-Control-Allow-Credentials": "*", "Access-Control-Allow-Methods": "PATCH"


    const res = await fetch(`http://localhost:4000/posts/${data.id}`)
    const post = await res.json()
    console.log(post.description)
    setUpdate(post.description)
    setShow(false)

    setEdit(false)
  }

  return (<>

    <Box sx={{ marginTop: "100px" }}>

      <Box>

        <Paper elevation={3} sx={{
          position: 'relative',
          display: 'block',
        }}>
          <img src={require('../Assets/laptop.jpeg')} alt="Image" style={{
            width: '100%',
            height: '70vh',
            objectFit: "cover",
            opacity: 0.8,
          }} />
          <Box sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}><Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} >
                <Box>
                  <Typography variant="h4" sx={{ mt: 1, mb: 1, color: "white" }}>{data.title}</Typography>

                </Box>
                <Box>
                  <EditIcon onClick={editPost} />

                </Box>
              </Box>

              <Box>
                <Typography variant="h7" sx={{ mb: 1, color: "white" }}>{show ? data.description : updatepost}</Typography>

              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box>
                <Typography variant="h6" sx={{ mt: 1, mb: 1, color: "white" }}>Author-{authorpost[0]?.firstName} {authorpost[0]?.lastName}</Typography>

              </Box>
              <Box>
                <Typography variant="h6" sx={{ mt: 1, mb: 1, marginLeft: "400px", color: "white" }}>Date-  {moment(data?.datePublished).format("DD/MM/YY")}</Typography>

              </Box>

            </Box>
          </Box>
        </Paper>

      </Box>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {edit ? <form >

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
              Edit Your Post here!
            </Typography>
            <Box>
              <Button variant='contained' onClick={handelUpdate}>Update</Button>
            </Box>
            <FormControl fullWidth sx={{ m: 1, }}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={15}
                name="editpost"
                onChange={update}
              /></FormControl>
          </Box>

        </form> : null}

        <Box sx={{ boxShadow: 3 }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} >
                <Tab label="Likes" />
                <Tab label="Comments" />

              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>

          </Box>
        </Box>
      </Container>
    </Box>
  </>)

};


export default Postdetails
// let AuthPost = []
// for (let i = 0; i < author.length; i++) {
//   if (author[i] !== null) {
//     AuthPost.push(author[i])
//   }
// }
// return new Promise((res, rej) => {
//   if (AuthPost !== 0) {
//     res(AuthPost)
//   }
//   else {
//     rej("not found")
//   }
// })