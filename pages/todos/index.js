import React, { useState } from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import styles from "../../styles/todos.module.css";
import logo from "../../public/assets/logos/Logo.svg";
import Image from "next/image";
import check from "../../public/assets/icons/Ellipse 1.svg";
import checkActive from "../../public/assets/icons/check.svg";
import del from "../../public/assets/icons/delete-1.svg";
import delActive from "../../public/assets/icons/delete.svg";
import star from "../../public/assets/icons/Vector.svg";
import starActive from "../../public/assets/icons/Vector-1.svg";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState("");

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
  const getFormattedDate = (e) => {
    const myDate = new Date(e);
    const result = myDate.getTime();
    console.log(result);
    console.log(Date.now());
    if (result < Date.now()) {
      return true;
    }
    return false;
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
          <div className={styles.actLog}>
            <u>Activity Log</u>
          </div>
        </div>

        <section className={styles.todoListContainer}>
          {todos.map((todo) => {
            return (
              <div
                className={
                  getFormattedDate(todo.createdAt)
                    ? `${styles.todoItem} ${styles.todoOverdue}`
                    : `${styles.todoItem}`
                }
                key={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <div className={styles.todoTick}>
                  <button
                    onMouseEnter={() => setIsHovered("check")}
                    onMouseLeave={() => setIsHovered("")}
                    onClick={() => handleComplete(todo.id)}
                  >
                    <Image src={isHovered === "check" ? checkActive : check} />
                  </button>
                  <p onClick={() => setShowOptions(!showOptions)}>
                    {todo.title}
                  </p>
                </div>
                {showOptions && (
                  <div className={styles.listIcons}>
                    <button
                      onMouseEnter={() => setIsHovered("star")}
                      onMouseLeave={() => setIsHovered("")}
                    >
                      <Image src={isHovered === "star" ? starActive : star} />
                    </button>
                    <button
                      onMouseEnter={() => setIsHovered("del")}
                      onMouseLeave={() => setIsHovered("")}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Image src={isHovered === "del" ? delActive : del} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </section>
        <CreateTodo />
      </div>
    </div>
  );
}
