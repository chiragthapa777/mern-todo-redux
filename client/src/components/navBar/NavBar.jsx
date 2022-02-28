import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root:{flexGrow:1},
  linkStyle: {
    color: "White",
    textDecoration: "none",
  },
  authButton: {},
});

export default function NavBar() {
  const auth=useSelector(state=>state.auth)

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSignOut = () => {
    //SingOut the user
    dispatch(signOut())
    navigate("/signin");
  };

  return (

    <AppBar position="static" color="primary">

      <Toolbar>

        <Typography variant="h4" className={classes.root}>
          <Link className={classes.linkStyle} to="/">
            TODO-APP
          </Link>
        </Typography>

        <Typography variant="subtitle2" className={classes.root}>
          {auth.name!==null?(`Logged in as ${auth.name}`):("Login to use TODO-APP")}
          
        </Typography>

        {
          auth.name!==null?(
        <Button onClick={() => handleSignOut()} color="inherit">
          SignOut
        </Button>):(
          <>
          <Button color="inherit">
          <Link className={classes.linkStyle} to="/signin">
            SignIn
          </Link>
        </Button>

        <Button  color="inherit">
          <Link className={classes.linkStyle} to="/signup">
            SignUp
          </Link>
        </Button> 
          </>

          )
        }
         


      </Toolbar>

    </AppBar>

  );
}
