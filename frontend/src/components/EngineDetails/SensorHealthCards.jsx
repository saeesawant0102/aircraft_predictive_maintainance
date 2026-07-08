import "./EngineDetails.css";

function SensorHealthCards({ engine }) {

  const sensors = [
    {
      name: "Sensor 2",
      current: engine.sensor_2,
      average: engine.sensor_2_avg30,
      diff: engine.sensor_2_diff,
    },
    {
      name: "Sensor 4",
      current: engine.sensor_4,
      average: engine.sensor_4_avg30,
      diff: engine.sensor_4_diff,
    },
    {
      name: "Sensor 11",
      current: engine.sensor_11,
      average: engine.sensor_11_avg30,
      diff: engine.sensor_11_diff,
    },
    {
      name: "Sensor 15",
      current: engine.sensor_15,
      average: engine.sensor_15_avg30,
      diff: engine.sensor_15_diff,
    },
    {
      name: "Sensor 17",
      current: engine.sensor_17,
      average: engine.sensor_17_avg30,
      diff: engine.sensor_17_diff,
    },
  ];

  const getStatus = (diff) => {

    const abs = Math.abs(diff);

    if (abs < 0.5)
      return {
        label: "Normal",
        color: "#38D27A",
        width: "95%",
      };

    if (abs < 2)
      return {
        label: "Monitor",
        color: "#FFBE0B",
        width: "65%",
      };

    return {
      label: "Critical",
      color: "#FF4D4F",
      width: "35%",
    };

  };

  return (

    <>

      <h2
        style={{
          color: "white",
          marginBottom: "18px",
        }}
      >
        Critical Sensor Analysis
      </h2>

      <div className="health-card-grid">

        {sensors.map((sensor) => {

          const status = getStatus(sensor.diff);

          return (

            <div
            key={sensor.name}
            className={`health-sensor-card ${
                status.label === "Normal"
                ? "card-normal"
                : status.label === "Monitor"
                ? "card-warning"
                : "card-critical"
            }`}
            >

              <div className="health-card-header">

                <h3>{sensor.name}</h3>

                <span
                  style={{
                    color: status.color,
                  }}
                >
                  {status.label}
                </span>

              </div>

              <div className="health-reading">

                {sensor.current.toFixed(2)}

              </div>

              <div className="sensor-progress">

                <div
                  className="sensor-progress-fill"
                  style={{
                    width: status.width,
                    background: status.color,
                  }}
                />

              </div>

              <div className="sensor-stats">

                <div>

                  <small>30 Avg</small>

                  <strong>

                    {sensor.average.toFixed(2)}

                  </strong>

                </div>

                <div>

                  <small>Δ Change</small>

                  <strong
                    style={{
                      color:
                        sensor.diff >= 0
                          ? "#38D27A"
                          : "#FF4D4F",
                    }}
                  >

                    {sensor.diff >= 0 ? "+" : ""}

                    {sensor.diff.toFixed(2)}

                  </strong>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </>

  );

}

export default SensorHealthCards;