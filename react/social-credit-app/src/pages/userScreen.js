import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "../components/userScreen/chart";
import SearchBar from "../components/mainScreen/searchBar";
import Title from "../components/mainScreen/title";
import BackButton from "../components/userScreen/backButton";
import StatsBar from "../components/userScreen/statsBar";

const UserScreen = () => {
  const user = useParams();

  return (
    <div>
      <Title />
      <div style={styles.header}>
        <BackButton />
        <SearchBar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <StatsBar userName={user.userName} />
        <Chart key={user.userName} userName={user.userName} />
        <div></div>
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 200,
    paddingRight: 200,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 10,
  },
};
export default UserScreen;
