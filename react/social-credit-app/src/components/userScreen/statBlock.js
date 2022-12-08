import React from "react";
import useWindowDimensions from "../useWindowsDimentions";

const StatBlock = (data) => {
  const { width } = useWindowDimensions();
  return (
    <div style={{ ...styles.block, width: width * 0.1 }}>
      <p style={styles.text}>{data.dataType}</p>
      <p style={styles.text}>{data.data}</p>
    </div>
  );
};

const styles = {
  block: {
    borderStyle: "solid",
    borderColor: "#5D5D5F",
    // backgroundColor: "#36333E",

    borderRadius: 4,
    margin: 20,
    marginLeft: 30,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 18,
    margin: 1,
  },
};

export default StatBlock;
