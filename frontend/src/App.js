import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import Contact from './components/Contact';
import Login from './components/Login';
import SingleMovie from './components/SingleMovie';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Error from './components/Error'
import Footer from './components/Footer';
import {Reducer}  from './utils/Reducer';
import { useGlobalContext } from './components/Context';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
 // const [state, dispatch] = useGlobalContext()
  // const getToken = async()=>{
  //   let token = localStorage.getItem('userdatatoken')
  //   const res = await fetch("http://localhost:8000/validuser",{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Accept":"application/json",
  //       "Authorization":token
  //     }
  //   })
  //   const data = await res.json();
  //   console.log(data)
  // //  console.log(state)
  //   if(data.status === 201){
  //     Reducer({type:"USER", payload:true})      
  //   }
  //   else{
  //     Reducer({type:"", payload:false})
  //     console.log("Hekko")
  //   }
  // }
  // useEffect(()=>{
  //   getToken();
  // },[])

  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/movies" element={<Movies/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/forget-password" element={<ForgetPassword/>}></Route>
            <Route path="/reset-password" element={<ResetPassword/>}></Route>
            <Route path="/movies/:id" element={<SingleMovie/>}></Route>
            <Route path="*" element={<Error/>}></Route>
    </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
