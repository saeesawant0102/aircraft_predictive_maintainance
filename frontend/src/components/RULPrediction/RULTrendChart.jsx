import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "./RULPrediction.css";

function RULTrendChart({ history }) {

  const chartData = history.map((row) => ({
    cycle: row.cycle,
    rul: row.Predicted_RUL,
  }));

  return (

    <div className="rul-chart-card">

      <div className="chart-header">

        <div>

          <h2>Remaining Useful Life Trend</h2>

          <p className="chart-subtitle">
            Predicted remaining life throughout engine operation
          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >

        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 35,
          }}
        >

          <CartesianGrid
            stroke="#17485D"
            strokeDasharray="5 5"
            vertical={false}
          />

          <XAxis
            dataKey="cycle"
            interval={20}
            tick={{
              fill:"#AFC7D6",
              fontSize:13,
            }}
            tickLine={false}
            axisLine={{
              stroke:"#2A6176",
            }}
            label={{
              value:"Engine Cycle",
              position:"bottom",
              dy:12,
              fill:"#7FC8E8",
              fontSize:15,
              fontWeight:600,
            }}
          />

          <YAxis
            tick={{
              fill:"#AFC7D6",
              fontSize:13,
            }}
            tickLine={false}
            axisLine={{
              stroke:"#2A6176",
            }}
            label={{
              value:"Predicted RUL",
              angle:-90,
              position:"left",
              dx:-1,
              fill:"#7FC8E8",
              fontSize:15,
              fontWeight:600,
            }}
          />

          <Tooltip />

          <Line
            dataKey="rul"
            stroke="#00F5D4"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default RULTrendChart;