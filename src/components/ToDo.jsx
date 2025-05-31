// src/components/ToDo.jsx

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import todo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  const [todolist, setTodoList] = useState([])
   

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteToDo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // Fetch todos on first load
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          id: item.id,
          text: item.title,
          isComplete: item.completed,
        }));


        const offset = 10000;
        
        setTodoList(() => formatted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* Input Box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-500"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="borded-none rounded-full bg-green-600 w-32 h-14 text-white text-large font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* All Todos */}
      <div>
        {todolist.map((item) => (
          <ToDoItems
            key={item.id}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteToDo={deleteToDo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDo;
