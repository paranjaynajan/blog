
// import * as fs from'fs'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import blog from "../../../Assets/Blog4.jpg"
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

function Signup(props) {
    const hide = props.data
   

    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [confirmshowPassword, setConfirmShowPassword] = useState(false);
    const [opendialog, setOpendialog] = useState(true)
    const [show, setShow] = useState(false)
    const [showp, setShowP] = useState(false)

    const [id, setId] = useState("")

    const handleClickShowPassword = () => {
        setShow(!show)
        setShowPassword((show) => !show);}

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickConfirmShowPassword = () =>{
        setShowP(!showp)
        
        setConfirmShowPassword((show) => !show)};

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };


    // const hhandelChange = async (event) => {

    //     setForm({
    //         ...formData, [event.target.name]: event.target.value, "numLikes": 0, "numPosts": 0, "numComments": 0, "id": id, "loggedIn": true
    //     })


    // }

    const submitHandel = async (values) => {
     
        console.log(values)
        await fetch(`http://localhost:4000/users/`,
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )

        setOpendialog(false)

        const data = await fetch("http://localhost:4000/users")
        const authors = await data.json()
        console.log(authors)
        const find = authors.filter((e) => { return e.firstName == values.firstName })
        const login = find[0].id

        nav('/Guest', { state: { login } })

    }

    const closeDialog = () => {
        setOpendialog(false)
        nav('/',)
    }

    const findData = async () => {
        const data = await fetch("http://localhost:4000/users")
        const authors = await data.json()
        console.log(authors.slice(-1))
        const authorid = Number(authors.slice(-1)[0].id) + 1
        const auth = authorid.toString()
        console.log(typeof auth)
        setId(auth)
    }

    useEffect(() => {
        findData()
        hide(false)
    }, [])

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.string()
            .min(10, "too short")
            .max(10, "too long")
            .required('Required'),
        password: Yup.string().required('Required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
     
        confirmpassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
    });


    return (
        <>
            <Box sx={{ backgroundImage: `url(${blog})`, width: "100%", height: "100vh" }}>
                <Dialog open={opendialog} >
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Box></Box>
                        <Box >
                            <CloseIcon onClick={closeDialog} />

                        </Box>
                    </Box>
                    <DialogTitle>
                        <Box>
                            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }} >
                                Sign Up!
                            </Typography>

                        </Box>

                    </DialogTitle>



                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            phone: "",
                            password: "",
                            confirmpassword: ""
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            
                            delete values.confirmpassword
                            values["numLikes"]= 0 
                            values["numPosts"]= 0
                            values[ "numComments"]= 0
                            values["id"]= id
                            values["loggedIn"]= true
                            
                      
                            submitHandel(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,

                        }) => (
                            <Form>
                                <Box sx={{ height: "600px", width: "500px", margin: "20px" }}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                                            First Name
                                        </Typography>

                                        <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                                            <TextField
                                                type='text'
                                                name="firstName"
                                                value={values.firstName}
                                                onChange={handleChange("firstName")}
                                                helperText={errors.firstName}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                                            Last Name
                                        </Typography>

                                        <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                                            <TextField
                                                name='lastName'
                                                type='text'
                                                value={values.lastName}
                                                onChange={handleChange("lastName")}
                                                helperText={errors.lastName}

                                            />
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                                            Phone
                                        </Typography>

                                        <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                                            <TextField
                                            
                                                name='phone'
                                                value={values.phone}
                                                onChange={handleChange("phone")}
                                                helperText={errors.phone}

                                            />
                                        </FormControl>
                                    </Box>

                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                                            Password
                                        </Typography>

                                        <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                                            <TextField
                                                type={show ? "text" : 'password'}
                                                name='password'
                                                value={values.password}
                                                onChange={handleChange("password")}
                                                helperText={errors.password}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}

                                            />
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                                            Confirm Password
                                        </Typography>

                                        <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                                            <TextField
                                                type={showp ? "text" : 'password'}
                                                name='confirmpassword'
                                                onChange={handleChange("confirmpassword")}
                                                helperText={errors.confirmpassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickConfirmShowPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {confirmshowPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "center", margin: "30px" }}>
                                        <Button variant='contained' type='submit' sx={{ p: 2 }}>Sign Up</Button>



                                    </Box>
                                </Box>
                            </Form>)

                        }
                    </Formik>
                </Dialog>
            </Box>

        </>
    )
}

export default Signup


