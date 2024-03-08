//import React from 'react';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, removeTodo, setTodoStatus, replaceDescriptions  } from "./redux/todoSlice";
import TaskItem from "./components/TaskItem";

import "./App.css"

function App() {
  const [todoDescription, setTodoDescription] = useState<string>("");
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='todo-container'>
      <h1 className='to-do-title'>To do list</h1>
        <input className='todo-input'
          type="text"
          placeholder="Add a task"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <button className='todo-btn-input'
          onClick={() => {
            dispatch(addTodo(todoDescription));
            setTodoDescription("");
          }}
        >
          Add
        </button>
      <ul>
        {todoList.map((todo) => (
          <TaskItem key={todo.id} todo={todo} />
          
          /*<li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }))}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.description}
            </span>
            <div className="replace-description">
              <button className='task-btn' onClick={() => dispatch(replaceDescriptions(
                {id: todo.id, newDescription: "Hello"}
              ))}>R</button>
            </div>
            <button className='task-btn' onClick={() => dispatch(removeTodo(todo.id.toString()))}>X</button>
          </li>*/
        ))}
      </ul>
    </div>
  );
}

export default App;
