import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const backButton = () => {
  return (
    <Link to={"/"} style={styles.button}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
  );
};

const styles = {
  button: {
    color: "white",
    fontSize: 35,
    // paddingLeft: 50,
    // paddingTop: 50,
  },
};

export default backButton;
