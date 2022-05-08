import React from "react";
import LeaderboardBottom from "../components/mainScreen/leaderboardBottom";
import LeaderboardTop from "../components/mainScreen/leaderboardTop";
import SearchBar from "../components/mainScreen/searchBar";
import Title from "../components/mainScreen/title";
import Spacer from "../components/spacer";

const mainScreen = () => {
  return (
    <div>
      <Title />
      <div style={styles.header}>
        <Spacer />
        <SearchBar />
      </div>
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={styles.leaderboards}>
          <LeaderboardTop />
          <LeaderboardBottom />
        </div>
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
  leaderboards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};

export default mainScreen;
