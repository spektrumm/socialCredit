import React from "react";
import { Leaderboard } from "./leaderboard";

export const LeaderboardBottom = () => {
  return (
    <div style={{ paddingRight: 30 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Execution List
      </h1>
      <Leaderboard top={false} />
    </div>
  );
};

export default LeaderboardBottom;
