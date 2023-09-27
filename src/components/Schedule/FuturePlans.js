import React from "react";
import { useEffect, useState } from "react";
import "./myStyles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

function FuturePlans() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function delteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <div className="con">
      <NewTodoForm onSubmit={addTodo} />
      <h1
        className="header-todo"
        style={{ fontWeight: "700", color: "darkslategray" }}
      >
        Future Plans
      </h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} delteTodo={delteTodo} />
    </div>
  );
}

export default FuturePlans;
