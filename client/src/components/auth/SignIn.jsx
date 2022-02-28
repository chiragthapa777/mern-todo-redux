import React,{useState} from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { useNavigate} from "react-router-dom";

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

const SignIn = () => {
  const navigate=useNavigate()
  const[creds, setCreds]=useState({
    email:"",
    password:""
  })
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  const handleSubmit=e=>{
    e.preventDefault()
    dispatch(signIn(creds))
    setCreds({
      email:"",
      password:""
    })
  }
  // console.log(auth)
  if(auth._id) navigate("/")
  
  const classes = useStyles();
  return (
    <>
      <form
        action=""
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">SIGN IN</Typography>
        <TextField
          id="=enter-email"
          label="Enter your email"
          variant="outlined"
          fullWidth
          className={classes.spacing}
          value={creds.email}
          onChange={e=>{setCreds({...creds,email:e.target.value})}}
          />
        <TextField
          id="=enter-password"
          type="password"
          label="Enter your password"
          variant="outlined"
          fullWidth
          className={classes.spacing}
          value={creds.password}
          onChange={e=>{setCreds({...creds,password:e.target.value})}}
          />
        <Button variant="contained" color="primary" type="submit"
          className={classes.spacing}>
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SignIn;
