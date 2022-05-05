import React, { useEffect, useState } from "react";
import { GetUserDataByName } from "../../requests";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";
import useWindowDimensions from "../useWindowsDimentions";

//user score vs timestamp graph 
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
    let messageData = [];

    user.forEach((message, index) => {
      let timestamp = parseInt(message.timestamp);
      messageData.push({
        x: timestamp,
        y: message.score,
      });
    });
    const data = {
      datasets: [
        {
          label: "Social Credit Vs Time",
          data: messageData,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    const options = {
      elements: {
        point: {
          radius: 0,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
          ticks: {
            maxTicksLimit: 10,
          },
        },
      },
    };
    return (
      <div style={{ width: width * 0.8, height: height * 0.9 }}>
        <Line options={options} data={data} />
      </div>
    );
  }
};

export default Chart;
