import StatBlock from "./statBlock";
import { GetUserInfoByName } from "../../requests";
import React, { useState, useEffect } from "react";

const StatsBar = (user) => {
  const currentScore = "Current Score";
  const messageStreak = "Message Streak";
  const rank = "Rank";
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    GetUserInfoByName(user.userName).then((result) => {
      setUserData(result);
    });
    const getUserInfo = setInterval(() => {
      GetUserInfoByName(user.userName).then((result) => {
        let userData = result;
        setUserData(userData);
      });
    }, 5000);

    return () => {
      clearInterval(getUserInfo);
    };
  }, []);

  return userData != undefined ? (
    <div style={styles.bar}>
      <StatBlock dataType={currentScore} data={userData[0].score} />
      <StatBlock dataType={messageStreak} data={userData[0].messageStreak} />
      <StatBlock dataType={rank} data={userData[0].rank} />
    </div>
  ) : null;
};

const styles = {
  bar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
  },
};

export default StatsBar;
