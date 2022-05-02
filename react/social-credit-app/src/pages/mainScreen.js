import React from "react";
import LeaderboardBottom from "../components/mainScreen/leaderboardBottom";
import LeaderboardTop from "../components/mainScreen/leaderboardTop";
import SearchBar from "../components/mainScreen/searchBar";
import Title from "../components/mainScreen/title";

const mainScreen = () => {
  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={styles.leaderboards}>
        <LeaderboardTop />
        <LeaderboardBottom />
      </div>
    </div>
  );
};

const styles = {
  leaderboards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};

export default mainScreen;
