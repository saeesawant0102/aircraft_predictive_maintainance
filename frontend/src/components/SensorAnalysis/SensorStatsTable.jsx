import "./SensorAnalysis.css";

function SensorStatsTable({ latest }) {

  const sensors = [

    {
      name: "Sensor 2",
      current: latest.sensor_2,
      average: latest.sensor_2_avg30,
      diff: latest.sensor_2_diff,
    },

    {
      name: "Sensor 4",
      current: latest.sensor_4,
      average: latest.sensor_4_avg30,
      diff: latest.sensor_4_diff,
    },

    {
      name: "Sensor 11",
      current: latest.sensor_11,
      average: latest.sensor_11_avg30,
      diff: latest.sensor_11_diff,
    },

    {
      name: "Sensor 15",
      current: latest.sensor_15,
      average: latest.sensor_15_avg30,
      diff: latest.sensor_15_diff,
    },

    {
      name: "Sensor 17",
      current: latest.sensor_17,
      average: latest.sensor_17_avg30,
      diff: latest.sensor_17_diff,
    },

  ];

  return (

    <div className="sensor-chart-card">

      <div className="chart-header">

        <h2>

          Sensor Statistics

        </h2>

      </div>

      <table className="sensor-stats-table">

        <thead>

          <tr>

            <th>Sensor</th>

            <th>Current</th>

            <th>30 Cycle Avg</th>

            <th>Difference</th>

          </tr>

        </thead>

        <tbody>

          {sensors.map((sensor) => (

            <tr key={sensor.name}>

              <td>{sensor.name}</td>

              <td>

                {sensor.current.toFixed(2)}

              </td>

              <td>

                {sensor.average.toFixed(2)}

              </td>

              <td
                className={
                  sensor.diff >= 0
                    ? "positive-change"
                    : "negative-change"
                }
              >

                {sensor.diff >= 0 ? "+" : ""}

                {sensor.diff.toFixed(2)}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default SensorStatsTable;