import React, { useState } from "react";
import styles from "./CreateAndUpdateTodoForm.module.css"
import axios from "axios";
import { baseUrl } from "../../Url.js";

function CreateAndUpdateTodoForm({setShowForm, fetchTodos}) {

  const closeForm = ()=>{
    setShowForm(false)
  }

  const [todo, setTodo] = useState({
    title: "",
    description: ""
  })

  let name, value;
  const handleInputs = (e)=>{
    name = e.target.name
    value = e.target.value

    setTodo({...todo, [name]:value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/user/todos/create`, todo, {
        headers:{
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      })
      window.alert(response.data.message)
      // console.log(response);
      fetchTodos();
      setTodo({title:"", description:""});
      
    } catch (error) {
      window.alert(error.response?error.response.data.message:error)
      console.log(error)
    }    
  }

  return (
    <div className={styles.createAndUpdateTodoForm}>
      <form className={styles.form}>
        <button className={styles.cnclBtn} onClick={closeForm} >X</button>
        <span className={styles.input_span}>
          <label className={styles.label}>
            Title
          </label>
          <input type="text" name="title" id="title" required={true} onChange={handleInputs} />
        </span>
        <span className={styles.input_span}>
          <label className={styles.label}>
            Description
          </label>
          <textarea name="description" id="description" rows={10} onChange={handleInputs} ></textarea>
        </span>
        <input className={styles.submit} type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default CreateAndUpdateTodoForm;
