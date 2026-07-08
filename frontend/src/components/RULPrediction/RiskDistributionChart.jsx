import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./RULPrediction.css";

function RiskDistributionChart({ fleet }) {

  const data = [

    {
      name:"Healthy",
      value:fleet.filter(
        e=>e.Health_Status==="Healthy"
      ).length,
    },

    {
      name:"Warning",
      value:fleet.filter(
        e=>e.Health_Status==="Warning"
      ).length,
    },

    {
      name:"Critical",
      value:fleet.filter(
        e=>e.Health_Status==="Critical"
      ).length,
    },

  ];

  const colors=[
    "#38D27A",
    "#FFBE0B",
    "#FF4D4F",
  ];

  return (

    <div className="gauge-card">

      <h2>

        Fleet Risk Distribution

      </h2>

      <ResponsiveContainer
        width="100%"
        height={260}
      >

        <PieChart>

          <Pie
            data={data}
            innerRadius={55}
            outerRadius={90}
            dataKey="value"
          >

            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default RiskDistributionChart;