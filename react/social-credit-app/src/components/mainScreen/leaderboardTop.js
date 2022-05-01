import React from "react";
import { Leaderboard } from "./leaderboard";

export const LeaderboardTop = () => {
  return (
    <div style={{ paddingRight: 30 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Top Samaritans
      </h1>
      <Leaderboard top={true} />
    </div>
  );
};

export default LeaderboardTop;
