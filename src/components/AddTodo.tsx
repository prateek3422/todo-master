"use client";
import { useTodoStore } from '@/store/Todo/todo';
import React from 'react'

export function AddTodo() {

const [todos, setTodos] = React.useState("");
    
const todoState = useTodoStore((state) => state.addTodo);

const handleSubmit = () => {
    todoState(todos);
    setTodos("");
  };

  
  return (
    <>
          <h1 className="text-3xl font-bold underline  text-center my-8">Todo</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row px-44 gap-4 items-center justify-center"
      >
        <input
          type="text"
          className="w-full px-4 py-2 border text-black font-bold  bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add a new todo"
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 w-24 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </>
  )
}
