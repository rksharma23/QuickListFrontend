import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./LandingPage.module.css";
import TodoCard from "../../components/TodoCard/TodoCard.js";
import CreateAndUpdateTodoForm from "../../components/CreateAndUpdateTodoForm/CreateAndUpdateTodoForm.js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Url.js";

function LandingPage() {

  const location = useLocation();
  const { user } = location.state || {}  
  const navigate = useNavigate()

  const [todos, setTodos] = useState([
    {
      title: "Sample title 1",
      description: "Smaple Description 1",
      status: "active",
    },
    {
      title: "Sample title 2",
      description: "Smaple Description 2",
      status: "active",
    },
    {
      title: "Sample title 3",
      description: "Smaple Description 3",
      status: "active",
    },
    {
      title: "Sample title 4",
      description: "Smaple Description 4",
      status: "active",
    },
    {
      title: "Sample title 5",
      description: "Smaple Description 5",
      status: "active",
    },
    {
      title: "Sample title 6",
      description: "Smaple Description 6",
      status: "active",
    },
  ]);

  const [showForm, setShowForm] = useState(false)

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/todos/get-todos`, {
        withCredentials: true,
      });
      setTodos(response.data.data) 
      // console.log(response.data.data);
           
    } catch (error) {
      if(error.response){
        window.alert(error.response.data.message)
        console.log(error)
        if(error.response.data.statusCode === 500 && error.response.data.message === "Unauthorized Access!!!"){
          navigate('/login')
        }
      }
      else{
        window.alert(error.message || "An error occurred");
        console.log(error);
        navigate('/login')
      }
    }
  };

  

  useEffect(()=>{
    fetchTodos();
  }, [])

  const openForm = ()=>{
    setShowForm(true)
  }

  return (
    <div className={styles.landingPage}>
      <NavBar isLoggedIn={true} userName={user?.data.userName} />
      <div className={styles.addTodoContainer}>
        <button className={styles.addTodoBtn} onClick={openForm} >ADD NEW TODO</button>
        {showForm?<CreateAndUpdateTodoForm setShowForm={setShowForm} fetchTodos={fetchTodos} />:<></>}
      </div>
      <h1 className={styles.landingPageHeading}>Your Todos</h1>
      <div className={styles.todoCardContainer}>
        {todos.length ? (
          todos.map((element, index) => {
            return (
              <TodoCard
                todoTitle={element.title}
                todoDescription={element.description}
                todoId={element._id}
                fetchTodos={fetchTodos}
                key={index}
              />
            );
          })
        ) : (
          <h2 className={styles.emptyTodoHeading}>No Todos to Display !!!</h2>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
