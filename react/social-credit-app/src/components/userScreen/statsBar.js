import React from "react";
import StatBlock from "./statBlock";

const StatsBar = (data) => {
  const currentScore = "Current Score";
  const messageStreak = "Message Streak";
  const topScore = "Top Score";
  //   const data = 1234;

  return (
    <div style={styles.bar}>
      <StatBlock dataType={currentScore} data={data.data} />
      <StatBlock dataType={messageStreak} data={data.data} />
      <StatBlock dataType={topScore} data={data.data} />
    </div>
  );
};

const styles = {
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    margin: "auto",
  },
};

export default StatsBar;
