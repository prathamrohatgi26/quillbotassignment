import React, { useState } from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import styles from "../../styles/todos.module.css";
import logo from "../../public/assets/logos/Logo.svg";
import Image from "next/image";
import check from "../../public/assets/icons/Ellipse 1.svg";
import del from "../../public/assets/icons/delete-1.svg";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <div className={styles.todosContainer}>
      <div className={styles.wrapper}>
        <div className={styles.todosContainerHead}>
          <Image src={logo} />
          <h1>Todo List</h1>
        </div>

        {/* Search bar */}
        <div className={styles.searchContainer}>
          <div>
            <input
              className={styles.search}
              type="text"
              placeholder="  Search"
            />
          </div>

          {/* Sorting dropdown */}
          <div>
            <select required className={styles.select}>
              <option
                className={styles.headSelect}
                value=""
                disabled
                selected
                hidden
              >
                Sort By
              </option>
              <option disabled={true} value="">
                --Choose and option--
              </option>
              <option value="title">Title (⬆)</option>
              <option value="title">Title (⬇)</option>
              <option value="createdAt">Due Date (⬆)</option>
              <option value="createdAt">Due Date (⬇)</option>
              <option value="createdAt">Created Date (⬇)</option>
            </select>
          </div>
          <div>
            <u>Activity Log</u>
          </div>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <button onClick={() => handleComplete(todo.id)}>
                <Image src={check} />
              </button>
              {todo.title}
              {todo.createdAt}
              {/* add overdue logic using ternary operator */}
              <button>Favorite</button>
              <button onClick={() => handleDelete(todo.id)}>
                <Image src={del} />
              </button>
            </li>
          ))}
        </ul>
        <CreateTodo />
      </div>
    </div>
  );
}
