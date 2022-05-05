import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { GetBottomUsers, GetTopUsers } from "../../requests";

//returns a leaderboard html
export const Leaderboard = (top) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //initial top/bottom user data fetch + update every 5 second interval
    let requestData;
    if (top.top == true) {
      requestData = GetTopUsers();
    } else {
      requestData = GetBottomUsers();
    }
    requestData.then((result) => {
      setUsers(result);
    });
    setInterval(() => {
      if (top.top == true) {
        requestData = GetTopUsers();
      } else {
        requestData = GetBottomUsers();
      }
      requestData.then((result) => {
        setUsers(result);
      });
    }, 5000);
  }, []);

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
                <td>{data.name}</td>
                <td>{data.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default Leaderboard;
