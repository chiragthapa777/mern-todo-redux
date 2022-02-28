import React from "react";
import { TextField, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/todoActions";
import { updateTodo } from "../../store/actions/todoActions";

const useStyles = makeStyles({
  fromStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 8px -3px #000000",
    display: "flex",
    justifyContent: "space-betweeen",
  },
  submitButton: {
    marginLeft: "20px",
  },
});

export default function AddTodos({todo, setTodo}) {
  const classes = useStyles();
  const dispatch = useDispatch()
 
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(todo._id){
      const updatedNewTodo={
        name:todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author:todo.author,
        uid:todo.uid
      }
      dispatch(updateTodo(updatedNewTodo, todo._id))
    }
    else{
      const newTodo={
        ...todo, date: new Date()
      }
    dispatch(addTodo(newTodo))
  }
  setTodo({
    name: "",
    isComplete: false,
  })
   
  }
  return (
    <>
      <form action="" className={classes.fromStyle} on onSubmit={handleSubmit}>
        <TextField
          id="enter-todo"
          label="Enter a todo...."
          autoFocus
          fullWidth
          value={todo.name}
          onChange={(e)=>{setTodo({...todo, name:e.target.value})}}
        />
        <Button
          color="primary"
          className={classes.submitButton}
          variant="contained"
          type="submit"
        >
          <AddCircleOutlineIcon />
        </Button>
      </form>
    </>
  );
}
