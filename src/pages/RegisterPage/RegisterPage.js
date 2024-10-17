import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { baseUrl } from "../../Url.js";

function RegisterPage() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })

  let name, value;
  const handleInputs = (e)=>{
    name = e.target.name
    value = e.target.value

    setUser({...user, [name]:value})
  }

  const handleRegister = async (event)=>{
    event.preventDefault();
    // console.log(user);
    //check for validation
    if(user.password.length < 8){
      alert("Minimum Length of Password is 8")
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/user/register`, user, {
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      // console.log(response);
      window.alert(response.data.message)
      setUser({userName: "", email: "", password: ""})
      navigate('/login')
    } catch (error) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        console.error('Error Response:', error.response.data);
        console.error('Status Code:', error.response.status);
        window.alert(error.response.data.message)
      } else if (error.request) {
        // Request was made but no response was received
        window.alert(error.response.data.message)
        console.error('Error Request:', error.request);
      } else {
        // Something else happened while setting up the request
        window.alert(error.response.data.message)
        console.error('Error Message:', error.message);
      }
    }
  }


  return (
    <div className={styles.registerPage}>
      <h1 className={styles.registerTitle}>REGISTER TO QUICK LISTS</h1>
      <div className={styles.formContainer}>
        <form className={styles.registerationForm}>
          <div className={styles.particularField}>
            <label>User-Name</label>
            <input required={true} placeholder="Enter UserName" id="userName" name="userName" onChange={handleInputs} type="string"/>
          </div>

          <div className={styles.particularField}>
            <label>Email</label>
            <input required={true} placeholder="Enter Your Email ID" id="email" name="email" onChange={handleInputs} type="email" />
          </div>

          <div className={styles.particularField}>
            <label>Password</label>
            <input required={true} placeholder="Enter a Password of min 8 length" id="password" name="password" onChange={handleInputs} type="password" />
          </div>
        
          <div className={styles.particularField}>
          <button className={styles.submitRegister} onClick={handleRegister}>Submit</button>
          <p className={styles.disclamer}>Already have an Account, <Link to={"/login"}>Click-Here</Link> to Login</p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
