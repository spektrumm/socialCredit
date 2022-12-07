import React, { useEffect, useState } from "react";
import { GetUserDataByName } from "../../requests";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Ticks, TimeScale } from "chart.js/auto";
import useWindowDimensions from "../useWindowsDimentions";
import "chartjs-adapter-date-fns";

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
    let messages = [];

    user.forEach((message) => {
      let d = new Date(0);
      d.setUTCMilliseconds(message.timestamp);
      messages.push({ x: d, y: message.score });
    });

    const data = {
      datasets: [
        {
          label: "Social Credit Vs Time",
          data: messages,
          fill: true,
          // backgroundColor: "rgba(75,192,192,0.2)",
          // backgroundColor: (context) => {
          //   const ctx = context.chart.ctx;
          //   const gradient = ctx.createLinearGradient(0, 0, 0, height);
          //   gradient.addColorStop(0, "rgba(75,192,192,1)");
          //   gradient.addColorStop(1, "rgba(27,27,39,0)");
          //   return gradient;
          // },
          segment: {
            borderColor: (ctx) => {
              return ctx.p0.parsed.y >= 0
                ? "rgba(75,192,192,1)"
                : "rgba(248,51,60,1)";
            },
            backgroundColor: (ctx) => {
              return ctx.p0.parsed.y >= 0
                ? "rgba(75,192,192,0.2)"
                : "rgba(248,51,60,0.2)";
            },
          },
          pointRadius: 0,
          borderWidth: 1,
          tension: 1,
        },
      ],
    };
    const options = {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            unitStepSize: 1,
            displayFormats: {
              day: "MM/dd/yyyy",
            },
          },
          offset: true,
          ticks: {
            maxTicksLimit: 20,
          },
        },
      },
      layout: { autoPadding: 100 },
      responsive: true,
      maintainAspectRatio: true,
      parsed: true,
    };

    return (
      <div style={{ width: width * 0.8, height: height * 0.9 }}>
        <Line
          options={options}
          //style={{ padding: 10 }}
          data={data}
        />
      </div>
    );
  }
};

export default Chart;
