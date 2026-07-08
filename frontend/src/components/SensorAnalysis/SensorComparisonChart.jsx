import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import "./SensorAnalysis.css";

function SensorComparisonChart({ latest }) {

  const data = [

    {
      sensor: "Sensor 2",
      value: Math.abs(latest.sensor_2_diff),
      raw: latest.sensor_2_diff,
    },

    {
      sensor: "Sensor 4",
      value: Math.abs(latest.sensor_4_diff),
      raw: latest.sensor_4_diff,
    },

    {
      sensor: "Sensor 11",
      value: Math.abs(latest.sensor_11_diff),
      raw: latest.sensor_11_diff,
    },

    {
      sensor: "Sensor 15",
      value: Math.abs(latest.sensor_15_diff),
      raw: latest.sensor_15_diff,
    },

    {
      sensor: "Sensor 17",
      value: Math.abs(latest.sensor_17_diff),
      raw: latest.sensor_17_diff,
    },

  ];

  const getColor = (value) => {

    if (value < 0.5)
      return "#38D27A";

    if (value < 2)
      return "#FFBE0B";

    return "#FF4D4F";

  };

  return (

    <div className="sensor-chart-card">

      <div className="chart-header">

        <h2>

          Critical Sensor Deviation

        </h2>

        <span className="chart-subtitle">

          Values represent |Current − 30-cycle Average|

        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >

        <BarChart
          data={data}
        >

          <CartesianGrid stroke="#123F52"
          strokeDasharray="4 4"
           />

          <XAxis
  dataKey="sensor"
  stroke="#9FB9C7"
  label={{
    value: "Critical Sensors",
    position: "insideBottom",
    offset: -5,
    fill: "#8AAFC0",
  }}
/>

<YAxis
  stroke="#9FB9C7"
  label={{
    value: "Deviation",
    angle: -90,
    position: "insideLeft",
    fill: "#8AAFC0",
  }}
/>

          <Tooltip
  content={<CustomTooltip />}
/>

          <Bar
            dataKey="value"
            radius={[8,8,0,0]}
          >

            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill={getColor(entry.value)}
              />
            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default SensorComparisonChart;