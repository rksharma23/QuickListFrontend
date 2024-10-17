import React from "react";
import styles from "./ToogleButton.module.css"

function ToogleButton() {
  return (
    <div className={styles.ToogleButton}>
      <div className={styles.toggle_switch}>
        <input className={styles.toggle_input} id="toggle" type="checkbox" />
        <label className={styles.toggle_label} htmlFor="toggle" />
      </div>
    </div>
  );
}

export default ToogleButton;
