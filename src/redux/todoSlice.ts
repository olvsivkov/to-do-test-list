import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";

const loadTodosFromLocalStorage = () => { // загрузить state из local storage
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

function visiblePopup(arg: string, index: number, tag: string){ // сделать видимым блок для изменения описания задачи
  const replaceDescriptionElements = document.querySelectorAll(tag);
  if (replaceDescriptionElements.length > index) {
    const replaceDescriptionElement = replaceDescriptionElements[index] as HTMLElement;
    replaceDescriptionElement.style.display = arg;
  }
}

const saveTodosToLocalStorage = (todos: Todo[]) => {  // сохранит данные в localstorage
  localStorage.setItem('todos', JSON.stringify(todos));
};

const initialState = loadTodosFromLocalStorage() as Todo[];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: { // создать задачу
      reducer: (state: any, action: PayloadAction<Todo>) => {
        state.push(action.payload);
        saveTodosToLocalStorage(state);
      },
      prepare: (description: string) => ({
        payload: {
          id: Math.floor(Math.random() * 11001),
          description,
          completed: false,
        } as Todo,
      })
    },
    removeTodo(state, action: PayloadAction<string>) {  // удалить задачу
      const index = state.findIndex((todo) => todo.id === parseInt(action.payload));
      state.splice(index, 1);
      saveTodosToLocalStorage(state);
    },
    setTodoStatus( // чекбокс - задача выполнена
      state,
      action: PayloadAction<{ completed: boolean; id: number }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      saveTodosToLocalStorage(state);
    },
    replaceDescriptions(state, action: PayloadAction<{ id: number; newDescription: string }>) { // изменить описание задачи
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].description = action.payload.newDescription;
      saveTodosToLocalStorage(state);
      visiblePopup('none', index, ".replace-description")
    },
    openPopup(state, action: PayloadAction<{ id: number; newDescription: string }>){ // открыть блок для изменения задачи и внести изменения
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      visiblePopup('block', index, ".replace-description")
    },
    showCompletedTask(state){ // фильтр исполненых задач
      const completedStateTask = state.filter((todo) => todo.completed === true);
      saveTodosToLocalStorage(completedStateTask);
      return completedStateTask
    },
    showNotCompletedTask(state){ // фильтр не исполненых задач
      const notCompletedStateTask = state.filter((todo) => todo.completed === false);
      saveTodosToLocalStorage(notCompletedStateTask);
      return notCompletedStateTask
    }
  },
});

export const { addTodo, removeTodo, setTodoStatus, replaceDescriptions, openPopup, showCompletedTask, showNotCompletedTask } = todoSlice.actions;
export default todoSlice.reducer;
