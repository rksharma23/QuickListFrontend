import React, { useState } from "react";
import styles from "./UpdateTodoForm.module.css";
import axios from "axios";
import { baseUrl } from "../../Url.js";

function UpdateTodoForm({
  setUpdateForm,
  fetchTodos,
  todoID,
  title,
  description,
}) {
    const closeUpdateForm = ()=>{
        setUpdateForm(false)
    }

  const [todo, setTodo] = useState({
    todoID: todoID,
    title: title,
    description: description,
    status: "active",
  });

  let name, value;
  const handleInputs = (e) => {
    if (e.target.type === "checkbox") {
      setTodo({ ...todo, status: e.target.checked ? "completed" : "active" });
    } else {
      name = e.target.name;
      value = e.target.value;

      setTodo({ ...todo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${baseUrl}/api/user/todos/update-todo`, todo, {
            withCredentials: true
        })
        // console.log(response);
        alert(response.data.message)
        fetchTodos();
    } catch (error) {
        alert(error.response?error.response.data.message:error);
        console.log(error);
    }
  };

  return (
    <div className={styles.updateTodoForm}>
      <form className={styles.form}>
        <button className={styles.cnclBtn} onClick={closeUpdateForm} >X</button>
        <span className={styles.input_span}>
          <label className={styles.label} htmlFor="title">
            Title<sup>*</sup>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required={true}
            onChange={handleInputs}
            defaultValue={title}
          />
        </span>
        <span className={styles.input_span}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={10}
            onChange={handleInputs}
            defaultValue={description}
          ></textarea>
        </span>
        <span className={`${styles.input_span} ${styles.checkBox}`}>
          <label className={styles.label} htmlFor="status">
            Mark Completed
          </label>
          <input
            type="checkbox"
            name="status"
            id="status"
            onChange={handleInputs}
          ></input>
        </span>
        <button className={styles.updateBtn} onClick={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateTodoForm;
