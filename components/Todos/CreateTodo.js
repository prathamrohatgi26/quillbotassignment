import React, { useState } from "react";
import icons from "../../public/assets/icons/plus.svg";
import tick from "../../public/assets/icons/tick.svg";
import wrong from "../../public/assets/icons/wrong.svg";
import start from "../../public/assets/icons/short_text.svg";
import Image from "next/image";
import styles from "../../styles/createTodo.module.css";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        createdAt: dateTime,
      }),
    });
    const todo = await response.json();
    setTitle("");
    setDateTime("");
  };
  const [show, setShow] = useState(false);

  return (
    <div>
      {show ? (
        <div>
          <div className={styles.todoItemContainer}>
            <Image src={start} alt="bullet" />
            <div className={styles.contentContainer}>
              <div className={styles.inputDateContainer}>
                <form onSubmit={handleSubmit}>
                  <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter Todo Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </form>
                <input
                  className={styles.inputDate}
                  value={dateTime}
                  type={"datetime-local"}
                  onChange={(e) => setDateTime(e.target.value)}
                ></input>
              </div>
              <div className={styles.createTodo}>
                <button
                  className={styles.todoButton}
                  onClick={() => setShow(false)}
                >
                  <Image src={wrong} alt="cross" />
                </button>
                <button className={styles.todoButton} onClick={handleSubmit}>
                  <Image src={tick} alt="ticl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className={styles.todoButton} onClick={() => setShow(true)}>
          <div className={styles.createTodo}>
            <Image src={icons} alt="add" />
            <p>Create new Task</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default CreateTodo;
