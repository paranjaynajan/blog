// import React, { useEffect, useState } from 'react'
// import Pagination from '@mui/material/Pagination';
// import Box from '@mui/material/Box';
// import { Typography } from '@mui/material';


// function Rough() {

//     const [mycard, setCard] = useState([])

//     const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


//     useEffect(() => {
//         setCard(data)
//     }, [])

//     return (<>
//         <div style={{
//             display: "flex",
//             flexWrap: "wrap",
//         }}>
//             {
//                 mycard.map((e, i) => {
//                     return <Box key={i}
//                         sx={{
//                             margin: "auto",
//                             width: "fit-content",
//                             alignItems: "center",

//                             border: "1px solid black"


//                         }}
//                     >
//                         <Typography fontSize={32} align="center">
//                             {e}
//                         </Typography>

//                     </Box>
//                 })
//             }
//         </div>
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
//             </Box>
//     </>
//     )
// }

// export default Rough
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import authors from '../src/Utils/Authors'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';




function Authors() {

    const [initalpage, setIntialPage] = useState()
    const [finalpage, setfinalPage] = useState()


    const handleChange = (event, value) => {
        console.log(value)
        setfinalPage(value * 50)
        setIntialPage(finalpage - 50)
        console.log(initalpage, finalpage)
        // setPopulate(authors.slice(initalpage, finalpage))
    };


    const nav = useNavigate()
    const [populateauthors, setPopulate] = useState([])



    useEffect(() => {
        setPopulate(authors.slice(0, 50))
    }, [])

    const sendetails = (data) => {

        nav('/Auth', { state: { data } })
    }
    return (

        <>

            {populateauthors.length == 0 ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box> :
                <Box sx={{ display: "grid", gridTemplateColumns: "3fr 3fr 3fr 3fr 3fr 3fr", gridGap: "10px" }}>
                    {populateauthors?.map((data, i) => {
                        return <Card sx={{ margin: "10px" }} key={i} >
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Avatar alt="Remy Sharp" src={require("/Users/paranjaynajan/Desktop/Learning/Blog/blog/src/Assets/user.jpeg")} sx={{ height: '150px', width: '150px' }} />
                            </Box>
                            <CardContent >
                                <Box >
                                    <Typography variant="h6" sx={{ mr: 1, textAlign: "center" }} >
                                        {data.firstName} {data.lastName}
                                    </Typography>

                                    <Typography sx={{ m: 1, textAlign: "center" }} >
                                        Contact- {data.phone}
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-around", margin: "10px" }}>
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
                                    <Button variant="contained" onClick={() => sendetails(data)} >Details</Button>
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
