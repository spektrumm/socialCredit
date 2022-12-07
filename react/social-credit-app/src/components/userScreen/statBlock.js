import React from "react";
import useWindowDimensions from "../useWindowsDimentions";

const StatBlock = (data) => {
  const { width, height } = useWindowDimensions();
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
    borderColor: "#5F5F60",
    margin: 20,
    marginLeft: 60,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 18,
    margin: 5,
  },
};

export default StatBlock;
