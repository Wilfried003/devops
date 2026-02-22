
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import MainSection from "./components/main-section";
import "todomvc-app-css/index.css";
import { Todo, TodoUpdate } from "./todo";

// This is the top-level component for our app.
const LOCAL_KEY = "todos-local";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleNewItem = (text: string) => {
    setTodos((prev) => {
      const next = [
        ...prev,
        {
          id: nanoid(),
          text,
          completed: false,
          sort: prev.length > 0 ? prev[prev.length - 1].sort + 1 : 1,
        },
      ];
      return next;
    });
  };

  const handleUpdateTodo = (update: TodoUpdate) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === update.id ? { ...todo, ...update } : todo
      )
    );
  };

  const handleDeleteTodos = (ids: string[]) => {
    setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)));
  };

  const handleCompleteTodos = (completed: boolean, ids: string[]) => {
    setTodos((prev) =>
      prev.map((todo) =>
        ids.includes(todo.id) ? { ...todo, completed } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => a.sort - b.sort);

  return (
    <div>
      <Header onNewItem={handleNewItem} />
      <MainSection
        todos={sortedTodos}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodos={handleDeleteTodos}
        onCompleteTodos={handleCompleteTodos}
      />
    </div>
  );
};

export default App;
