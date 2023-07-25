
// import * as fs from'fs'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import blog from "../../../Assets/Blog4.jpg"
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';








function Login() {
  const [showPassword, setShowPassword] = useState(false);

  




  const [opendialog, setOpendialog] = useState(true)
  const nav = useNavigate()
  const [show, setShow] = useState(false)
  const [formData, setForm] = useState({})


  const handelChange = (event) => {
    setForm({ ...formData, [event.target.name]: event.target.value })
  }
  const closeDialog = () => {
    setOpendialog(false)
    nav('/',)
  }
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickShowPassword = () => {

    setShowPassword((show) => !show)
    setShow(!show)


  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandel = async (values) => {
 
 
    const data = await fetch("http://localhost:4000/users")
    const authors = await data.json()
    console.log(authors)
    const find = authors.filter((e) => { return e.firstName == values.firstName && e.password == values.password })
   
    if (find.length != 0) {
      const login = find[0].id
      console.log(find)
       localStorage.setItem('login', JSON.stringify(find))
      nav('/Guest', { state: { login } })

    } else {

      setOpen(true);
    }
  }



  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string().required('Required'),

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
                  Log In
                </Typography>

              </Box>

            </DialogTitle>

            <Formik
              initialValues={{
                firstName: '',
                password: "",
             
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values)
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

            <Box sx={{ height: "400px", width: "300px", margin: "20px" }}>

              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Typography variant="h6" sx={{ ml: 2, mr: 2, mt: 1, fontWeight: "bold" }} >
                  Username
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
                  Password
                </Typography>

                <FormControl fullWidth sx={{ ml: 1, mr: 1, mt: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount" ></InputLabel>
                  <TextField
                        type={show ? "text":'password'}
                        name="password"
                        value={values.password}
                        onChange={handleChange("password")}
                        helperText={errors.password}
                        InputProps={{
                          endAdornment:(
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

              <Box sx={{ display: "flex", justifyContent: "center", margin: "30px" }}>
                <Button variant='contained' type='submit' sx={{ p: 2 }}   >Log In</Button>



              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", margin: "30px" }}>
                <Button variant='outlined' type='submit' sx={{ p: 2 }}  >Login With Google</Button>



              </Box>
            </Box>
                </Form>)

              }
            </Formik>
          
        </Dialog>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >

        <Box boxShadow={5} >
          <Alert icon={false} sx={{ backgroundColor: "#1976d2", color: "white", width: "500px" }} severity="info">

            <Typography variant="h6">
              Invalid Username or Password
            </Typography>

          </Alert>
        </Box>




      </Snackbar>
    </>
  )
}

export default Login
