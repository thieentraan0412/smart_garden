import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData, type }) {
  const containerStyle = {
    width: '90%',
  }

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    hourCycle: 'h12',
  };

  let _label, _color, _backgroundColor;
  switch (type) {
    case "temp":
        _label = "Nhiệt độ";
        _color = "red"
        _backgroundColor = 'rgb(255,0,0,0.25)'
        break
    case "soil":
        _label = "Độ ẩm đất (%)";
        _color = "blue"
        _backgroundColor = 'rgb(0,0,255,0.25)'
        break
    case "air":
        _label = "Độ ẩm không khí (%)";
        _color = "blue"
        _backgroundColor = 'rgb(0,0,255,0.25)'
        break
    case "light":
        _label = "Độ rọi (lx)";
        _color = "yellow"
        _backgroundColor = 'rgb(255,255,0,0.25)'
        break
    default:
        _label = "Bật/Tắt máy bơm";
        _color = "black"
        _backgroundColor = 'rgb(0,0,0,0.25)'
  }

  return (
    <div style={containerStyle}>
      <Line
        data={{
          labels: chartData.map((data) => new Date(data.log_time).toLocaleString('en-US', options)),
          datasets: [
                {
                  label: _label,
                  fill: true,
                  data: chartData.map((data) => data.value),
                  borderColor: _color,
                  borderWidth: 2,
                  backgroundColor: _backgroundColor,
                }
              ]
        }}
        options={{
          plugins: {
            legend: {
              display: true
            },
          },
          // Change font size
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 10,
                font: {
                  size: 8,
                }
              }
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;