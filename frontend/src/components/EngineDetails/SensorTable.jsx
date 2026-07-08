import "./EngineDetails.css";

function SensorTable({ engine }) {

  const sensors = [];

  for (let i = 1; i <= 21; i++) {

    let value = engine[`sensor_${i}`];

    let status = "Normal";
    let className = "sensor-normal";

    if (
      i === 2 &&
      Math.abs(engine.sensor_2_diff) >= 0.5
    ) {
      status = "Monitor";
      className = "sensor-warning";
    }

    if (
      i === 4 &&
      Math.abs(engine.sensor_4_diff) >= 2
    ) {
      status = "Monitor";
      className = "sensor-warning";
    }

    if (
      i === 11 &&
      Math.abs(engine.sensor_11_diff) >= 0.2
    ) {
      status = "Monitor";
      className = "sensor-warning";
    }

    if (
      i === 15 &&
      Math.abs(engine.sensor_15_diff) >= 0.02
    ) {
      status = "Monitor";
      className = "sensor-warning";
    }

    if (
      i === 17 &&
      Math.abs(engine.sensor_17_diff) >= 2
    ) {
      status = "Monitor";
      className = "sensor-warning";
    }

    sensors.push({
      sensor: `Sensor ${i}`,
      value,
      status,
      className,
    });

  }

  return (

    <div className="engine-card">

      <h2>

        Complete Sensor Readings

      </h2>

      <table className="sensor-table">

        <thead>

          <tr>

            <th>Sensor</th>

            <th>Current Reading</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {

            sensors.map(sensor=>(

              <tr key={sensor.sensor}>

                <td>

                  {sensor.sensor}

                </td>

                <td>

                  {Number(sensor.value).toFixed(3)}

                </td>

                <td>

                  <span
                    className={sensor.className}
                  >

                    {sensor.status}

                  </span>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default SensorTable;