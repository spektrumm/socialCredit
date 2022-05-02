import React, { useEffect, useState } from "react";
import { GetUserDataByName } from "../../requests";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import useWindowDimensions from "../useWindowsDimentions";

const Chart = (userName) => {
  const { height, width } = useWindowDimensions();

  const [user, setUser] = useState([]);
  useEffect(() => {
    GetUserDataByName(userName.userName).then((result) => {
      setUser(result);
    });

    setInterval(() => {
      GetUserDataByName(userName.userName).then((result) => {
        let userData = result;
        setUser(userData);
      });
    }, 5000);
  }, []);

  if (user !== undefined) {
    let xValues = [];
    let yValues = [];
    // console.log(user);
    user.forEach((message) => {
      xValues.push(message.timestamp);
      yValues.push(message.score);
      //   messages.push({ x: message.timestamp, y: message.score });
    });
    // console.log(messages);
    // const data = {
    //   //labels: labels,
    //   datasets: [
    //     {
    //       label: "My First Dataset",
    //       data: [
    //         { x: 80, y: 90 },
    //         { x: 81, y: 29 },
    //         { x: 56, y: 36 },
    //         { x: 55, y: 25 },
    //         { x: 40, y: 18 },
    //       ],
    //       fill: false,
    //       borderColor: "rgb(75, 192, 192)",
    //       tension: 0.1,
    //     },
    //   ],
    // };

    const data = {
      labels: xValues,
      datasets: [
        {
          label: "Social Credit Vs Time",
          data: yValues,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    return (
      <div style={{ width: width * 0.8, height: height * 0.9 }}>
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: true,
            //layout: { autoPadding: 100 },
          }}
          //style={{ padding: 10 }}
          data={data}
        />
      </div>
    );
  }
};

export default Chart;
