import { React, forwardRef, useImperativeHandle, useState } from 'react'
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import Authorslider from './Authorslider';
import BlogDesc from './BlogDesc';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const Homepage=(props)=> {
    const hide = props.data
 
    const [open, setOpen] = useState(false);

    const [showname,setShowname]=useState("")



    const[log,setLog]=useState({})

   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

   
    let local = useLocation()

  

    const logged = async () => {
        if(local.state!==null){
        const logId = local.state.login

        props.id(logId)
        if (logId !== undefined) {
           
        const res = await fetch(`http://localhost:4000/users?id=${logId}`)
        const post = await res.json()
        
        const login = post[0].loggedIn
        const loginId = post[0].id
        const user = post[0].firstName
        setShowname(user)
            setLog({ "id": loginId, "logged": login, "Username": user })

        await fetch(`http://localhost:4000/logged/`,
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(log),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )  
   
    } 
      
    }}
 


    useEffect(() => {
        setOpen(true);
        hide(true)
        logged()
    }, [])

    return (<>
        <Box sx={{ mt: "100px" }}>

            <Box
                sx={{
                    m: "20px"
                }}
            >
                <Paper elevation={3} sx={{ padding: "30px" }}>
                    <Box sx={{
                        width: "100%",

                    }}>

                        <Typography variant="h4" component="h2" sx={{
                            color: "Black",
                            fontWeight: "Bold", m: 1, position: "relative"
                        }} >My Blog</Typography>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                        <Typography variant="h6" sx={{
                            color: "Black",
                            m: 1, textAlign: "justify"
                        }} >
                            Affiliate disclosure In full transparency some of the links on this website are affiliate links,
                            if you use them to make a purchase we will earn a commission at no additional cost for you (none whatsoever!).
                            Will this be a problem? This is how we manage to create free content for you.Please know that your trust is so important for us.
                            width of the element and (100%) of the height of the element. Have either of them set to auto, which will size the undefined dimension automatically, while preserving the images aspect ratio.
                        </Typography>

                    </Box>

                </Paper>
                <BlogDesc></BlogDesc>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                >

                    <Box boxShadow={5} >
                        <Alert icon={false} sx={{ backgroundColor: "#1976d2", color: "white", width: "500px" }} severity="info">
                            
                            <Typography variant="h6">
                                Welcome  {showname}
                            </Typography>
                            
                          </Alert>
                    </Box>




                </Snackbar>
            </Box>
            <Authorslider></Authorslider>
        </Box>
    </>
    )
}

export default Homepage
