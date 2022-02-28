import React,{useEffect} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Todos from "./components/todos/Todos";
import NavBar from "./components/navBar/NavBar";
import {Container} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/actions/authActions";
const useStyles = makeStyles({
  contentStyle:{
    margin:"30px auto"
  }
})

export default function App() {
  const auth=useSelector(state=>state.auth)
  console.log(auth.name);
  const dispatch=useDispatch()
  useEffect(()=>{
    console.log("load user");
    dispatch(loadUser())
  },[dispatch])
  const classes= useStyles()
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Container maxWidth="md">
        <NavBar />
        <Container className={classes.contentStyle}>
          <Routes>
            {
              auth.name!==null && (
                <Route>
                  <Route path="/" element={<Todos />} />
                </Route>
              )
            }
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to={auth.name!==null? "/":"/signin"}/>  }/>
        </Routes>
        </Container>
        

      </Container>
      </BrowserRouter>
    </>
  );
}
