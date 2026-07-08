import { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./SensorAnalysis.css";

function SensorTrendChart({ history }) {

  const [selectedSensor, setSelectedSensor] =
    useState("sensor_2");

  const chartData = history.map((row) => ({
    cycle: row.cycle,
    value: row[selectedSensor],
  }));

  return (

    <div className="sensor-chart-card">

      <div className="chart-header">

        <h2>Sensor Trend</h2>

        <select
          value={selectedSensor}
          onChange={(e) =>
            setSelectedSensor(e.target.value)
          }
        >

          {Array.from(
            { length: 21 },
            (_, i) => (
              <option
                key={i + 1}
                value={`sensor_${i + 1}`}
              >
                Sensor {i + 1}
              </option>
            )
          )}

        </select>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={chartData}>

          <CartesianGrid stroke="#124457" 
          strokeDasharray="4 4"/>

          <XAxis
        dataKey="cycle"
        stroke="#9FB9C7"
        label={{
            value: "Engine Cycle",
            position: "insideBottom",
            offset: -5,
            fill: "#8AAFC0",
        }}
        />

        <YAxis
        stroke="#9FB9C7"
        label={{
            value: "Sensor Reading",
            angle: -90,
            position: "insideLeft",
            fill: "#8AAFC0",
        }}
        />
          <Tooltip
  content={<CustomTooltip />}
/>

          <Line
            type="monotone"
            dataKey="value"
            stroke="#00F5D4"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default SensorTrendChart;