import * as React from 'react';

// import * as fs from'fs'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import moment from "moment"
import InputLabel from '@mui/material/InputLabel';

import CloseIcon from '@mui/icons-material/Close';


function Form(props) {

    const myMomentObject = moment();
    const [formdata, setFormdata] = React.useState({
        "datePublished": myMomentObject,
        "numComments": 0,
        "numLikes": 0,

    })
    const [authorid, setAuthorId] = React.useState(1000)
    const [id, setId] = React.useState(10000)
    const [titlevalidate, setTitlevalidate] = React.useState(false)
    const [authorvalidate, setAuthorvalidate] = React.useState(false)
    const [postvalidate, setPostvalidate] = React.useState(false)
    const { onClose, selectedValue, open } = props;
    const [authorname, setAuthorname] = React.useState("")

    const handleClose = () => {
        onClose(selectedValue);
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setAuthorId(authorid + 1)
        setId(id + 1)
        const data = { ...formdata, ["authorId"]: authorid, "id": id }
        setFormdata({ ...data })
        await fetch(`http://localhost:4000/posts/`,
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(formdata),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )

        console.log(formdata)


        onClose(selectedValue);

    }


    const handelTitle = (e) => {
        const title = e.target.value
        if (title.length == 0) {
            setTitlevalidate(false)
        } else {
            setTitlevalidate(true)
            const data = { ...formdata, [e.target.name]: e.target.value }
            setFormdata(data)
        }

    }
    // const handelAuthor = (e) => {
    //     const title = e.target.value
    //     if (title.length == 0) {
    //         setAuthorvalidate(false)
    //     } else {
    //         setAuthorvalidate(true)
    //         // const data = { ...formdata, [e.target.name]: e.target.value }
    //         // setFormdata(data)
    //     }

    // }
    const handelPost = (e) => {
        const title = e.target.value
        if (title.length == 0) {
            setPostvalidate(false)
        } else {
            setPostvalidate(true)
            const data = { ...formdata, [e.target.name]: e.target.value, "userId": props.idofAuthor, }
            setFormdata(data)
        }

    }

  
    React.useEffect(() => {
      const data=localStorage.getItem('login')
     const final = JSON.parse(data)
     if(final){
         setAuthorname(final[0].firstName)
     }else{
        setAuthorname("Sign up first")
     }
 
    

    }, [])
    return (
        <Dialog open={open} >
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box></Box>
                    <Box >
                        <CloseIcon onClick={handleClose} />

                    </Box>
                </Box>
                <DialogTitle>
                    <Box>
                        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }} >
                            Add Your Own Post
                        </Typography>

                    </Box>

                </DialogTitle>



                <Box sx={{ height: "725px", width: "500px" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography variant="h6" sx={{ ml: 2, mr: 2, fontWeight: "bold" }} >
                            Title
                        </Typography>

                        <FormControl fullWidth sx={{ ml: 1, mr: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                            <TextField
                                name='title' onChange={
                                    handelTitle}
                            // helperText={titlevalidate ? "" : "Cannot be empty"}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography variant="h6" sx={{ ml: 2, mr: 2,mt:2, fontWeight: "bold" }} >
                            Author:-
                        </Typography>
                        <Box sx={{marginTop:"17px",}}>
                            <Typography variant="h6" sx={{  fontWeight: "bold" }} >
                            {authorname}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                            What's on your mind??
                        </Typography>

                        <FormControl fullWidth sx={{ m: 1, }}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={17}
                                name="description" onChange={handelPost}
                            // helperText={postvalidate ? "" : "Cannot be empty"}
                            /></FormControl>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>


                        {
                            titlevalidate && postvalidate ?
                                <Button variant='contained' type='submit'    >submit</Button>
                                : <Button variant='contained' type='submit' disabled={true}    >submit</Button>
                        }


                    </Box>
                </Box>
            </form>
        </Dialog>
    );
}
export default Form