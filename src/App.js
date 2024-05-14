import { useEffect, useState } from "react";
import "./styles.css";

import Todolist from "./TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");    
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [newItem, setNewItem] = useState("");
  const [editId, setEditId] = useState(0);

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

  function handleSubmit(e) {
    e.preventDefault();

    const filteredItems = todos.filter((item) => item.title === newItem);

    if (newItem.trim() !== "" && filteredItems.length === 0) {
      if (editId) {
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, title: newItem } : item
        );
        setTodos(updatedTodos);
        setEditId(0);
        setNewItem("");
      } else {
        addTodo(newItem);
        setNewItem("");
      }
    }
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

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id) {
    const editItem = todos.find((item) => item.id === id);
    setNewItem(editItem.title);
    setEditId(id);
  }

  return (
    <div>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To-Do List</h1>
      <Todolist
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
