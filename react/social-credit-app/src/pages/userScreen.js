import React from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/userScreen/chart";

const UserScreen = () => {
  const { userName } = useParams();
  //console.log(user.name);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Chart userName={userName} />
    </div>
  );
};

const styles = {
  text: {
    color: "white",
    fontSize: 18,
    padding: 10,
  },
};
export default UserScreen;
