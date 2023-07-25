import { React, useRef, useState } from 'react';
import './App.css';
import Authors from './Authors/Authors';
import Example from './Pages/Landing/Corsoal';
import Homepage from './Pages/Landing/Homepage';
import BlogAppBar from './Pages/Navbar/BlogNavbar';
import { Route, Routes } from "react-router-dom"
import Posts from './Post/Post';
import Authordetails from './Authors/Authordetails';
import Postdetails from './Post/Postdetails';
import Blogfooter from './Pages/Footer/Blogfooter';
import Rough from './Rough';
import Test from './Rough/Test';
import Test2 from './Rough/Test2';
import Signup from './Pages/LogIN/Signup/Signup';
import Main from './Pages/LogIN/Signup/Main';
import Login from './Pages/LogIN/Signup/Login';


function App() {
  const [shownav, setNav] = useState(true)

 const [id,setId]=useState(0)

 return (<>

    {
      shownav ? <BlogAppBar data={id}></BlogAppBar> : ""
    }


    <div >

      <Routes>
        <Route path='/' element={<Main data={setNav} />}></Route>
        <Route path='/Guest' element={<Homepage data={setNav} id={setId} />}></Route>
        <Route path='/Authors' element={<Authors data={setNav} />}></Route>
        <Route path='/Post' element={<Posts data={setNav}  id={id}/>}></Route>
        <Route path='/Auth' element={<Authordetails data={setNav} />}></Route>
        <Route path='/Postdetails' element={<Postdetails data={setNav} />}></Route>
        <Route path='/Login' element={<Login data={setNav} />}></Route>
        <Route path='/Signup' element={<Signup data={setNav} />}></Route>
      </Routes>
    
    </div>

    {
      shownav ? <Blogfooter></Blogfooter> : ""
    }
  </>
  );
}

export default App;
