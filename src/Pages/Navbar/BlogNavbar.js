import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;
const navItems = ['Home', 'Post', 'Authors'];

function BlogAppBar(props) {
    const loggedid=Number(props.data)
    const nav = useNavigate()
   const[navname,setNav]=React.useState("BLOG")
 const[logout,setLogout]=React.useState(false)



    // const submitHandel = async (loggedid) => {     
    //     console.log(loggedid)
    //     const data = await fetch(`http://localhost:4000/users?id=${loggedid}`)
    //     const authors = await data.json()
    //    console.log(authors)
    //    if(authors.length!==0){
    //  setLogout(authors[0].loggedIn)
         
    //    }else{

    //    }
    // }

React.useEffect(()=>{
    //  submitHandel(loggedid)

    const dataoflog = localStorage.getItem("login")
    const dataofuser = JSON.parse(dataoflog)
   
 if (dataofuser!==null){
     setLogout(dataofuser[0].loggedIn)
 }else{
    setLogout(false)
 }
 
   
},[])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },textAlign:"left" }}
                    >
                        {navname}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                       
                        <Button sx={{ color: '#fff' }} onClick={() => {setNav("HOME"); nav('/Guest')}}>
                                Home
                            </Button>
                        <Button sx={{ color: '#fff' }} onClick={() => {setNav("AUTHORS");nav('/Authors')}}>
                                Authors
                            </Button>
                        <Button sx={{ color: '#fff' }} onClick={() => { setNav("POST"); nav('/Post') }}>
                                Post
                            </Button>
                     {  logout? <Button sx={{ color: '#fff' }} onClick={() => {setLogout(false) ;localStorage.clear() ;{  nav('/')} }}>
                            Log out
                        </Button>:""}

                        
                      
                    </Box>
                </Toolbar>
            </AppBar>
            
          
        </Box>
    );
}


export default BlogAppBar;
