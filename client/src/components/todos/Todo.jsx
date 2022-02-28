import React from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "moment";
import { checkTodo } from "../../store/actions/todoActions";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../store/actions/todoActions";

const useStyles = makeStyles({
  todoStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  grayStyle: {
    color: "#8f8f8f",
    fontSize: "small",
  },
  isComplete: {
    color: "green",
  },
  checked: {
    textDecoration: "line-through",
  },
});

export default function Todo({ todo, setTodo }) {
    const dispatch=useDispatch()
    const handleUpdate=()=>{
        setTodo(todo)
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
    }
    const handleCheck=()=>{
        dispatch(checkTodo(todo._id))
    }
    const handleDelete=()=>{
        dispatch(deleteTodo(todo._id))
    }
  const classes = useStyles();
  return (
    <div className={classes.todoStyle}>
      <div>
        {todo.isComplete ? (
          <Typography variant="subtitle1" className={classes.checked}>
           {todo.name}
          </Typography>
        ) : (
          <Typography variant="subtitle1">{todo.name}</Typography>
        )}

        <Typography variant="subtitle1" className={classes.grayStyle}>
          Author: {todo.author}
        </Typography>
        <Typography variant="subtitle1" className={classes.grayStyle}>
          Added: {Moment(todo.date).fromNow()}
        </Typography>
      </div>
      <div>
        <ButtonGroup size="small" aria-label="outlined primary button group">
            <Button onClick={handleCheck}>
          {todo.isComplete ? (
              <CheckCircle color="Action" className={classes.isComplete} />
          ) : (
              <CheckCircle color="Action"  />
          )}
            </Button>

          <Button onClick={handleUpdate}>
            <Create color="Primary" />
          </Button>
          <Button onClick={handleDelete}>
            <Delete color="Secondary" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
