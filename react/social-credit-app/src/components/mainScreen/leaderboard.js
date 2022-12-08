import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { GetBottomUsers, GetTopUsers } from "../../requests";
import { Link } from "react-router-dom";

//returns a leaderboard html
export const Leaderboard = (top) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //initial top/bottom user data fetch + update every 5 second interval
    let requestData;
    if (top.top) {
      requestData = GetTopUsers();
    } else {
      requestData = GetBottomUsers();
    }
    requestData.then((result) => {
      setUsers(result);
    });
    const refresh = setInterval(() => {
      if (top.top) {
        requestData = GetTopUsers();
      } else {
        requestData = GetBottomUsers();
      }
      requestData.then((result) => {
        setUsers(result);
      });
    }, 500);

    return () => {
      clearInterval(refresh);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (users !== undefined) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Table bordered>
          <thead>
            <tr style={{ color: "#FFFFFF", fontSize: 20 }}>
              <th style={{ padding: 20 }}>#</th>
              <th style={{ padding: 20 }}>Display Name</th>
              <th style={{ padding: 20 }}>Social Credit</th>
            </tr>
          </thead>
          <tbody style={{ color: "#FFFFFF", fontSize: 20 }}>
            {users.map((data) => (
              <tr key={data.place * data.score}>
                <th scope="row">{data.place}</th>
                <td>
                  <Link style={styles.link} to={"/user/" + data.name}>
                    {data.name}
                  </Link>
                </td>
                <td>{data.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

const styles = {
  link: {
    fontSize: 18,
    color: "white",
    textDecoration: "none",
    paddingTop: 5,
  },
};

export default Leaderboard;
