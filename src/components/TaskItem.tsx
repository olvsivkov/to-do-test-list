import React from 'react';
import { useDispatch } from 'react-redux';
import { setTodoStatus, replaceDescriptions, removeTodo, openPopup } from '../redux/todoSlice';
import { useState } from 'react';

interface TaskItemProps {
  todo: {
    id: number;
    completed: boolean;
    description: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ todo }) => {
  const [replaceDescription, setReplaceDescription] = useState<string>("");
  const dispatch = useDispatch();


  return (
    <>
      <li key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }))}
          />
        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.description}
        </span>
        <button className='task-btn change-btn' onClick={() => dispatch(openPopup({ id: todo.id, newDescription: replaceDescription }))}>Change</button>
        <button className='task-close-btn' onClick={() => dispatch(removeTodo(todo.id.toString()))}>X</button>
      </li>
      <div className="replace-description">
        <input className='todo-input popup-input'
          type="text"
          value={replaceDescription}
          onChange={(e) => setReplaceDescription(e.target.value)}
        />
        <button className='task-btn' onClick={() => dispatch(replaceDescriptions({ id: todo.id, newDescription: replaceDescription }))}>
          SAVE
        </button>
      </div>
    </>
  );
};

export default TaskItem;