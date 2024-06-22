import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface TodoState {
  todos: any;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  completeTodo: (id: string) => void;
}

let initialState = [{ id: uuidv4(), title: "test", completed: false }];

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        todos: initialState,
        addTodo: (title) =>
          set((state) => ({
            todos: [...state.todos, { id: uuidv4(), title, completed: false }],
          })),
        deleteTodo: (id) =>
          set((state) => ({
            
            todos: state.todos.filter((todo: { id: any }) => todo.id !== id),
          })),
          
        updateTodo: (id, title) =>
          set((state) => ({
            todos: state.todos.map((todo: { id: any }) =>
              todo.id === id ? { ...todo, title } : todo
            ),
          })),
        completeTodo: (id) =>
          set((state) => ({
            todos: state.todos.map((todo: { id: any; completed: true }) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),
      }),
      {
        name: "Todo",
        getStorage: () => sessionStorage,
      }
    )
  )
);
