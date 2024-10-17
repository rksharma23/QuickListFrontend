import React from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Url.js";

function NavBar({ isLoggedIn, userName }) {
  const navigate = useNavigate();
  const redirectToWelcomePage = () => {
    navigate("/");
  };

  const handleLogout = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/user/logout`, {}, {
        withCredentials: true
      })
      // console.log(response);
      alert(response.data.message)
      navigate('/login')
    } catch (error) {
      alert(error);
      console.log(error)
    }
  }

  return (
    <nav className={styles.NavBar}>
      <div className={styles.left_component}>
        <h1 className={styles.navHeading} onClick={redirectToWelcomePage}>
          {userName ? `Welcome ${userName}` : `Welcome to QuickList`}
        </h1>
      </div>
      <div className={styles.right_component}>
        {isLoggedIn ? (
          <>
            {/* <button className={styles.button}>About</button> */}
            <button className={styles.button} onClick={handleLogout} >LogOut</button>
          </>
        ) : (
          <Link to={"/register"}>
            <button className={styles.button}>Login/Signup</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
