import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";

const initialState = [] as Todo[];

function visiblePopup(arg: string, index: number){
  const replaceDescriptionElements = document.querySelectorAll('.replace-description');
  if (replaceDescriptionElements.length > index) {
    const replaceDescriptionElement = replaceDescriptionElements[index] as HTMLElement;
    replaceDescriptionElement.style.display = arg;
  }
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state: any, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: Math.floor(Math.random() * 11001),
          description,
          completed: false,
        } as Todo,
      })
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === parseInt(action.payload));
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: number }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    replaceDescriptions(state, action: PayloadAction<{ id: number; newDescription: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].description = action.payload.newDescription;
      visiblePopup('none', index)
    },
    openPopup(state, action: PayloadAction<{ id: number; newDescription: string }>){
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      visiblePopup('block', index)
    }
  },
});

export const { addTodo, removeTodo, setTodoStatus, replaceDescriptions, openPopup } = todoSlice.actions;
export default todoSlice.reducer;
