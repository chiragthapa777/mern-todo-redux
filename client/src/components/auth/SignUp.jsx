import React, {useState} from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {useNavigate} from "react-router-dom"

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 8px -3px #000000",
    width:"60%"
  },
  spacing:{
      marginTop:"20px"
  }
});

const SignUp = () => {
  const navigate=useNavigate()
  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const classes = useStyles();
  const [user, setUser]=useState({
    name:"",
    email:"",
    password:"",
  })
  const handleSubmit=e=>{
    e.preventDefault()
    dispatch(signUp(user))
    setUser({
      name:"",
      email:"",
      password:"",
    })
  }
  // console.log(auth._id)
  if(auth._id) navigate("/")
  return (
    <>
      <form
        action=""
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">SIGN UP</Typography>
        <TextField
          id="=enter-name"
          label="Enter your name"
          variant="outlined"
          fullWidth
          className={classes.spacing}
          value={user.name}
          onChange={(e)=>{setUser({...user,name:e.target.value})}}
          />
        <TextField
          id="=enter-email"
          label="Enter your email"
          variant="outlined"
          fullWidth
          className={classes.spacing}
          value={user.email}
          onChange={(e)=>{setUser({...user,email:e.target.value})}}
          />
        <TextField
          id="=enter-password"
          type="password"
          label="Enter your password"
          variant="outlined"
          fullWidth
          className={classes.spacing}
          value={user.password}
          onChange={(e)=>{setUser({...user,password:e.target.value})}}
          />
        <Button variant="contained" color="primary" type="submit"
          className={classes.spacing}>
          Sign up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
