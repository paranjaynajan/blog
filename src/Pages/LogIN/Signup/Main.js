import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import blog from "../../../Assets/Blog4.jpg"
import { useNavigate } from 'react-router-dom';

export default function Main(props) {
    const nav = useNavigate()

    const hide = props.data

    useEffect(() => {
        hide(false)


    }, [])

    const sendHome = () => {
        nav('/Guest', { state: {} })
    }

    const sendLogin = () => {
        nav('/Login',)
    }

    const sendSignup = () => {
        nav('/Signup',)
    }
    return (
        <>
            <Box sx={{ backgroundImage: `url(${blog})`, width: "100%", height: "100vh" }}>


                <Dialog open={true} >

                    <DialogTitle>
                        <Box>
                            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }} >
                                Sign Up!
                            </Typography>

                        </Box>

                    </DialogTitle>



                    <Box sx={{ height: "300x", width: "250px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }} >
                                Welcome
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "justify" }} >
                                This is a blog website Created with 3 for front end developers who need a quick back-end for prototyping and mocking.
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                            <Button variant='contained' sx={{ p: 1 }} onClick={sendSignup}>Sign Up</Button>

                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant='contained' sx={{ p: 1 }} onClick={sendLogin}>Login</Button>

                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                            <Button variant='outlined' sx={{ p: 1 }} onClick={sendHome}>Guest</Button>

                        </Box>
                    </Box>


                </Dialog>
            </Box>
        </>
    )
}
