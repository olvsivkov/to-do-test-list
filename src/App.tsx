import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, showComplitedTask, showNotComplitedTask, showAllTasks } from "./redux/todoSlice";
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
      <div className="complited-checkbox-container">
        <div>
          <span className="complited-task-change"
          onClick={()=>dispatch(showComplitedTask())}
          >
            complited task
          </span> / 
          <span className="not-complited-task-change"
          onClick={()=>dispatch(showNotComplitedTask())}
          >
            not complited task
          </span> /
          <span className="all-tasks"
          onClick={()=>dispatch(showAllTasks())}
          >
            all tasks
          </span>
        </div>
      </div>
      <ul>
        {todoList.map((todo) => (
          <TaskItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
