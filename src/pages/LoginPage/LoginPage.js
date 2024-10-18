import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"
import axios from "axios";
import { baseUrl } from "../../Url.js";

function LoginPage() {

  const navigate = useNavigate()

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  let name, value;
  const handleInputs = (e)=>{
    name = e.target.name
    value = e.target.value

    setUserCredentials({...userCredentials, [name]:value})
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    
    if(userCredentials.email === "" || userCredentials.password === ""){
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, userCredentials, {
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials:true,
      })

      // console.log(response);
      window.alert(response.data.message)

      if(response.status === 200){        
        navigate('/dashboard', {state: {user: response.data}})
      }
    } catch (error) {
      if(error.response){
        window.alert(error.response.data.message)
        console.error('Error Response:', error.response.data);
        console.error('Status Code:', error.response.status);
      }else if (error.request) {
        // Request was made but no response was received
        window.alert(error.request || 'Unidentified Error Occured')
        console.error('Error Request:', error.request);
      } else {
        // Something else happened while setting up the request
        window.alert(error.message)
        console.error('Error Message:', error.message);
        
      }
    }
  }

  return (
    <div>
      <div className={styles.loginPage}>
        <h1 className={styles.loginTitle}>LOGIN TO QUICK LISTS</h1>
        <div className={styles.formContainer}>
          <form className={styles.loginForm}>
            <div className={styles.particularField}>
              <label>Email</label>
              <input required={true} placeholder="Enter Your Email ID" id="email" name="email" onChange={handleInputs} type="email" />
            </div>

            <div className={styles.particularField}>
              <label>Password</label>
              <input
                required={true}
                placeholder="Enter a Password of min 8 length"
                id="password"
                name="password"
                onChange={handleInputs}
                type="password"
              />
            </div>

            <div className={styles.particularField}>
              <button className={styles.submitLogin}  onClick={handleLogin}>Submit</button>
              <p className={styles.disclamer}>
                Don't have an Account, <Link to={"/register"}>Click-Here</Link> to Register <br/>
                <Link to={'/'} >Back to Home</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
