import React,{useState} from 'react';
import AddTodos from './AddTodos';
import ListTodos from './ListTodos';

export default function Todos() {
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });
  return <div>
      <AddTodos todo={todo} setTodo={setTodo}/>
      <ListTodos setTodo={setTodo} />
  </div>;
}
