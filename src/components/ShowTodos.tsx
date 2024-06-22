"use client";

import { useTodoStore } from '@/store/Todo/todo';
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ShowTodos = () => {
  const completeTodo = useTodoStore((state) => state.completeTodo);
  const getTodos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.updateTodo);

  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleEditClick = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleEditSave = (id: string) => {
    editTodo(id, editTitle);
    setEditId(null);
    setEditTitle('');
  };

  return (
    <>
      <ul className="flex flex-col gap-4 items-center justify-center mt-8 text-center w-full border-gray-200 py-4">
        {getTodos.map((todo: { id: string; title: string; completed: boolean }) => (
          <li key={todo.id}>
            <div className="flex flex-row gap-4 rounded-2xl items-center justify-start px-4 mt-6 w-[60vw] border-2 border-gray-200 py-4">
              <input
                type="checkbox"
                className="w-6 h-6 text-blue-500 bg-gray-100 rounded-full"
                checked={todo.completed}
                onChange={() => completeTodo(todo.id)}
              />
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                {editId === todo.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={handleEditChange}
                    className="input text-black input-bordered w-full"
                  />
                ) : (
                  <span>{todo.title}</span>
                )}

                <div className="flex flex-row gap-4 items-center justify-center">
                  {editId === todo.id ? (
                    <button className="text-2xl" onClick={() => handleEditSave(todo.id)}>
                      Save
                    </button>
                  ) : (
                    <button className="text-2xl" onClick={() => handleEditClick(todo.id, todo.title)}>
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-2xl"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
