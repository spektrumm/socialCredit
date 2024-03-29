import React, { useState } from "react";
import useWindowDimensions from "../useWindowsDimentions";

//Social Credit title 
export const Title = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 60,
          color: "white",
          // margin: "auto",
          // paddingLeft: width / 2 - 170,
        }}
      >
        Social Credit
      </h1>
    </div>
  );
};

const styles = {
  text: {},
};

export default Title;
