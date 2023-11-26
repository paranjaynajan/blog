import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Authordetails() {

    const nav = useNavigate()
    let local = useLocation()
    const res = local.state.data
    const [expanded, setExpanded] = React.useState(null);

    const handleExpandClick = (index) => {
        expanded == null ?
            setExpanded(index) : setExpanded(null)
    };
    const [authordetails, setAuthordetails] = useState([])
    const [topLike, setTopLikes] = useState([])
    const [topcomments, setTopComments] = useState([])
    const [change, setChange] = useState(true)
    const navigatetopost = (data) => {
        nav('/Postdetails', { state: { data } })
    }


    // const finddata = async () => {
    //     let getAutherPostData = await filterAutherPostData(post, res.id)
    //     topLiked(getAutherPostData)
    //     topComment(getAutherPostData)
    // }

    const filterAutherPostData = (post, autherId) => {
        let filteredPost = []
        for (let i = 0; i < post.length; i++) {
            if (post[i].authorId == autherId) {
                filteredPost.push(post[i])
            }
        }
        return new Promise((res, rej) => {
            if (filteredPost !== 0) {
                res(filteredPost)
            }
            else {
                rej("not found")
            }
        })


    }
    const topLiked = (data) => {

        const authordata1 = data?.sort(
            (a, b) => {
                if (a.numLikes < b.numLikes) {
                    return 1;
                }
                if (a.numLikes > b.numLikes) {
                    return -1;
                }
                return 0;

            })

        setTopLikes(authordata1?.slice(0, 5))
    }

    const topComment = (data) => {

        const authordata2 = data?.sort(
            (a, b) => {
                if (a.numComments < b.numComments) {
                    return 1;
                }
                if (a.numComments > b.numComments) {
                    return -1;
                }
                return 0;

            })

        setTopComments(authordata2?.slice(0, 5))
    }

    const toggle = () => {
        setChange(!change)
    }

    const getData = async () => {
        const data = await fetch("http://localhost:4000/posts")
        const post = await data.json()
        let getAutherPostData = await filterAutherPostData(post, res.id)
        topLiked(getAutherPostData)
        topComment(getAutherPostData)
    }


    useEffect(() => {

        getData()
    }, [])

    
  

    return (
        <>
            <Box sx={{ marginTop: "100px" }}
            >
                <Box sx=
                    {{ display: "flex", justifyContent:"center" }} >
                    <Avatar alt="" src={require("../Assets/user.jpeg")} sx={{ height: '300px', width: '300px' }} />

                </Box>

                <Box>
                    <Typography variant='h4' sx={{ textAlign: "center", marginTop: "20px" }}>
                        {res.firstName}  {res.lastName}
                    </Typography>
                    <Typography variant='h5' sx={{ textAlign: "center", marginTop: "20px" }}>
                        Contact number-    {res.phone}
                    </Typography>
                    <Box sx={{ margin: "20px" }}>
                        <Typography variant='h7' >
                        </Typography>
                    </Box>


                    <Box>
                        <Box sx={{ margin: "50px" }}>
                            <Alert sx={{ height: "70px", display: "flex", justifyContent: "space-evenly", marginBottom: "50px" }} severity="info" icon={false}>

                                <Button variant='outlined' onClick={toggle} sx={{ marginRight: "100px" }} disabled={change?true:false}   >Top Likes</Button>
                                <Button variant='outlined' onClick={toggle} sx={{ marginLeft: "100px" }}    disabled={change?false:true}   >Top Comments</Button>
                            </Alert>
                            {
                                change ? topLike.map((data, index) => {
                                    return <List sx={{ width: '100%', bgcolor: 'background.paper', border: "1px solid black", margin: "5px", padding: "10px" }} key={index} >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'white' }} >{
                                                    change ? <ThumbUpIcon color='secondary' sx={{ fontSize: 30 }} /> : <QuestionAnswerIcon color='secondary' sx={{ fontSize: 30 }} />
                                                }

                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText onClick={() => navigatetopost(data)}>

                                                <Box sx={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>

                                                    <Box>
                                                        <Typography variant="h6" sx={{ mr: 1, }} >
                                                            Title-{data.title}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                                                        <Box >
                                                            <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                                                Likes- {data.numLikes}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                                                Comments- {data.numComments}
                                                            </Typography>
                                                        </Box>


                                                    </Box>

                                                </Box>
                                            </ListItemText >

                                            <ExpandMore
                                                onClick={() => { handleExpandClick(index) }}
                                                aria-label="show more">
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </ListItem>
                                        <ListItem>
                                            {expanded === index ?
                                                <Box>

                                                    <Typography variant="h6">Description:</Typography>
                                                    <Typography variant="h7">
                                                        {data.description}
                                                    </Typography>

                                                </Box>

                                                : null
                                            }

                                        </ListItem>

                                    </List>


                                }) 
                                :topcomments.map((data, index) => {
                                    return <List sx={{ width: '100%', bgcolor: 'background.paper', border: "1px solid black", margin: "5px", padding: "10px" }} key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'white' }} >{
                                                    change ? <ThumbUpIcon color='secondary' sx={{ fontSize: 30 }} /> : <QuestionAnswerIcon color='secondary' sx={{ fontSize: 30 }} />
                                                }

                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText onClick={() => navigatetopost(data)}>

                                                <Box sx={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>

                                                    <Box>
                                                        <Typography variant="h6" sx={{ mr: 1, }} >
                                                            Title-{data.title}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                                                        <Box >
                                                            <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                                               Likes- {data.numLikes}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                                            Comments- {data.numComments}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        
                                                    </Box>
                                                    
                                                </Box>
                                            </ListItemText>
                                    
                                                    <ExpandMore
                                                        onClick={() => { handleExpandClick(index) }}
                                                        aria-label="show more">
                                                        <ExpandMoreIcon />
                                                    </ExpandMore>
                                        </ListItem>
                                  <ListItem>
                                            {expanded === index ?
                                                <Box>

                                                    <Typography variant="h6">Description:</Typography>
                                                    <Typography variant="h7">
                                                        {data.description}
                                                    </Typography>

                                                </Box>

                                                : null
                                            }

                                  </ListItem>

                                    </List>


                                })
                            }
                        </Box>

                    </Box>

                </Box>

            </Box>
        </>
    )
}

export default Authordetails



