import React, { useEffect, useState, useRef } from "react";
import { GetUserDataByName } from "../../requests";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Ticks, TimeScale } from "chart.js/auto";
import useWindowDimensions from "../useWindowsDimentions";
import "chartjs-adapter-date-fns";

const getGradient = (chart) => {
  const chartBottom = chart.chartArea.bottom;
  const chartTop = chart.chartArea.top;
  const chartHeight = chartBottom - chartTop;
  const pointZero = chart.scales.y.getPixelForValue(0);
  const pointZeroHeight = pointZero - chartTop;
  const pointZeroPercentage = pointZeroHeight / chartHeight;

  const gradient = chart.ctx.createLinearGradient(
    0,
    chartTop,
    0,
    chartHeight + chartTop
  );
  gradient.addColorStop(0, "rgba(10,10,58, 1)");
  gradient.addColorStop(pointZeroPercentage, "rgba(34,96,122,0.5)");
  gradient.addColorStop(pointZeroPercentage, "rgba(34,96,122,0.5)");
  gradient.addColorStop(1, "rgba(10,10,58, 1)");
  return gradient;
};


const Chart = (user) => {
  const { height, width } = useWindowDimensions();
  const [userData, setUserData] = useState(undefined);
  const [bgColor, setBgColor] = useState("rgba(34,96,122,0.5)");

  const chartRef = useRef(null);
  useEffect(() => {
    GetUserDataByName(user.userName).then((result) => {
      setUserData(result);
      //);
    });
    const bgInterval = setInterval(() => {
      const chart = chartRef.current;
      if (chart !== null) {
        setBgColor(getGradient(chart));
        clearInterval(bgInterval);
      }
    }, 1);

    setInterval(() => {
      GetUserDataByName(user.userName).then((result) => {
        let userData = result;
        setUserData(userData);
      });
    }, 5000);
  }, []);

  if (userData !== undefined) {
    let messageData = [];

    userData.forEach((message, index) => {
      let timestamp = parseInt(message.timestamp);
      messageData.push({
        x: timestamp,
        y: message.score,
      });
    });
    let data = {
      datasets: [
        {
          label: "Social Credit Vs Time",
          data: messageData,
          fill: true,
          backgroundColor: bgColor,
          borderColor: bgColor,
        },
      ],
    };
    const options = {
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
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
      <div style={{ width: width * 0.7, height: height * 0.7 }}>
        {messageData.length > 1 ? (
          <Line ref={chartRef} options={options} data={data} />
        ) : (
          <h2 style={{ color: "white", paddingTop: 50 }}>
            No data to display!
          </h2>
        )}
      </div>
    );
  }
};

export default Chart;
