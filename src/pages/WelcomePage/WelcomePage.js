import React from "react";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./WelcomePage.module.css"
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <>
      <NavBar isLoggedIn={false} />
      <div className={styles.welcomeNote}>
        <p className={styles.welcomeNoteParagraph}>
          Hey There!<br/>
          A very warm welcome to Quick Lists - Your Daily Partner. Here you will get a personalized solution to keep track of your important tasks and todos. Quick Lists provides you a user friendly and totaly secure interface so that you can add your tasks without any concern.
          Here are some key features why you should Switch to Quick-Tasks:<br/>
          1. Login/Signup Functionality<br/>
          2. Multiuser Functionality<br/>
          3. Password Encryption<br/>
          4. Dynamic and Responsive UI<br/>
          5. Retrive all your completed tasks of last One Month<br/>
        </p>
        <Link to={"/register"}><button className={styles.startNowBtn}>Start Now</button></Link>
      </div>
    </>
  );
}

export default WelcomePage;
