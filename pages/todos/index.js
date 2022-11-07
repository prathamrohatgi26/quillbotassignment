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
import duplicate from "../../public/assets/icons/XMLID 7.svg";
import duplicateActive from "../../public/assets/icons/XMLID 8.svg";
import starTodo from "../../utils/todos/starTodo";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [showOptions, setShowOptions] = useState("");
  const [isHovered, setIsHovered] = useState("");
  // const [updatedDb,setUPdatedDb] = useState()

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStar = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await starTodo(id, !todo.isStarred);
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, !todo.completed);
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
  };

  const getFormattedDate = (e) => {
    const myDate = new Date(e);
    const result = myDate.getTime();

    if (result < Date.now()) {
      return true;
    }
    return false;
  };

  // export from create todo later

  const createDuplicateEntry = async (title, dueDate) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate,
      }),
    });
    const todo = await response.json();
    console.log(todo);
    getTodos().then((todos) => setTodos(todos));
  };

  return (
    <div className={styles.todosContainer}>
      <div className={styles.wrapper}>
        <div className={styles.todosContainerHead}>
          <Image alt="logo" src={logo} />
          <h1>Todo List</h1>
        </div>

        {/* Search bar */}
        <div id="todo-search-bar" className={styles.searchContainer}>
          <div>
            <input
              className={styles.search}
              type="text"
              placeholder="  Search"
            />
          </div>

          {/* Sorting dropdown */}
          <div>
            <select id="todo-sort-dropdown" required className={styles.select}>
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
              <option id="todo-sort-dropdown__title-ascending" value="title">
                Title (⬆)
              </option>
              <option id="todo-sort-dropdown__title-descending" value="title">
                Title (⬇)
              </option>
              <option id="todo-sort-dropdown__due-date-ascending" value="date">
                Due Date (⬆)
              </option>
              <option id="todo-sort-dropdown__due-date-descending" value="date">
                Due Date (⬇)
              </option>
              <option
                id="todo-sort-dropdown__created-date-descending"
                value="createdAt"
              >
                Created Date (⬇)
              </option>
            </select>
          </div>
          <div className={styles.actLog}>
            <u>Activity Log</u>
          </div>
        </div>

        <section className={styles.todoListContainer}>
          {todos.map((todo, i) => {
            return (
              <div
                className={
                  getFormattedDate(todo.dueDate)
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
                    onMouseEnter={() => setIsHovered(`check` + `${i}`)}
                    onMouseLeave={() => setIsHovered("")}
                    onClick={() => handleComplete(todo.id)}
                  >
                    <Image
                      alt="check"
                      src={
                        isHovered === `check` + `${i}` || todo.completed
                          ? checkActive
                          : check
                      }
                    />
                  </button>
                  <p
                    onClick={() =>
                      showOptions === todo.id
                        ? setShowOptions("")
                        : setShowOptions(todo.id)
                    }
                  >
                    {todo.title}
                  </p>
                </div>
                {showOptions === todo.id && (
                  <div className={styles.listIcons}>
                    <button
                      id="todo-duplicate-button__${todo_id}"
                      onMouseEnter={() => setIsHovered(`duplicate` + `${i}`)}
                      onMouseLeave={() => setIsHovered("")}
                      onClick={() =>
                        createDuplicateEntry(todo.title, todo.dueDate)
                      }
                    >
                      <Image
                        alt="dup"
                        src={
                          isHovered === `duplicate` + `${i}`
                            ? duplicateActive
                            : duplicate
                        }
                      />
                    </button>
                    <button
                      onMouseEnter={() => setIsHovered(`star` + `${i}`)}
                      onMouseLeave={() => setIsHovered("")}
                      onClick={() => handleStar(todo.id)}
                    >
                      <Image
                        alt="star"
                        src={
                          isHovered === `star` + `${i}` || todo.isStarred
                            ? starActive
                            : star
                        }
                      />
                    </button>
                    <button
                      onMouseEnter={() => setIsHovered(`del` + `${i}`)}
                      onMouseLeave={() => setIsHovered("")}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Image
                        alt="delete"
                        src={isHovered === `del` + `${i}` ? delActive : del}
                      />
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
