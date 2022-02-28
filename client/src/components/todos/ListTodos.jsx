import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import Todo from "./Todo";
import { makeStyles } from "@material-ui/core/styles";
import { getTodos } from "../../store/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  todosStyle: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0px 0px 8px -3px #000000",
  },
});

export default function ListTodos({setTodo}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <div className={classes.todosStyle}>
      <Typography variant="h6">
        {todos.length > 0 ? "TODOS LIST" : "No todos, anything to add?"}
      </Typography>
      {todos &&
        todos.map((todo) => {
          return(
            <Todo key={todo._id} todo={todo} setTodo={setTodo} />
          )
        })}
    </div>
  );
}
